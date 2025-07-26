"use client";
import { useState, useEffect } from "react";
import type { User } from "@/types";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarEvent {
  id?: string;
  date: string;
  title: string;
  team_id: string;
}

export default function CalendarPage() {
  const [date, setDate] = useState<Value>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<CalendarEvent | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Fetch user, teams, and events
    const fetchUserTeamsAndEvents = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Fetch teams (lead and member)
      const { data: leadTeams } = await supabase
        .from("teams")
        .select("id, name")
        .eq("created_by", user.id);
      const { data: memberTeams } = await supabase
        .from("team_members")
        .select("team_id, teams(id, name)")
        .eq("user_id", user.id);
      const memberTeamsList = (memberTeams || [])
        .map((tm: { teams: { id: string; name: string } | { id: string; name: string }[] }) => Array.isArray(tm.teams) ? tm.teams[0] : tm.teams)
        .filter((team: { id: string; name: string } | undefined) => team);
      const allTeams = [ ...(leadTeams || []), ...memberTeamsList ];
      // Remove duplicates
      const uniqueTeams = Array.from(new Map(allTeams.map(t => [t.id, t])).values());
      setTeams(uniqueTeams);
      if (uniqueTeams.length > 0) setSelectedTeamId(uniqueTeams[0].id);
      // Fetch all events for all teams
      if (uniqueTeams.length > 0) {
        const teamIds = uniqueTeams.map(t => t.id);
        const { data: dbEvents } = await supabase
          .from("calendar_events")
          .select("id, event_date, title, team_id")
          .in("team_id", teamIds);
        setEvents((dbEvents || []).map(e => ({ 
          id: e.id,
          date: new Date(e.event_date).toDateString(), 
          title: e.title, 
          team_id: e.team_id 
        })));
      }
    };
    fetchUserTeamsAndEvents();
  }, [router]);

  function formatDateDDMMYYYY(date: Date) {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  }

  const selectedDateStr = date
    ? Array.isArray(date)
      ? (date[0] ? date[0].toDateString() : '')
      : date.toDateString()
    : '';
  const eventsForDate = events.filter((e) => e.date === selectedDateStr);

  async function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!eventTitle.trim() || !user || !selectedTeamId) return;
    
    const eventDate = Array.isArray(date) ? (date[0] ? date[0].toISOString().slice(0, 10) : null) : (date as Date).toISOString().slice(0, 10);
    
    // Save to Supabase
    const { data, error } = await supabase.from("calendar_events").insert([
      {
        user_id: user.id,
        team_id: selectedTeamId,
        event_date: eventDate,
        title: eventTitle.trim(),
      },
    ]).select();

    if (error) {
      alert("Failed to add event. Please try again.");
      return;
    }

    const newEvent = data[0];
    const eventObj = { 
      id: newEvent.id,
      date: selectedDateStr, 
      title: eventTitle.trim(), 
      team_id: selectedTeamId 
    };
    setEvents((prev) => [...prev, eventObj]);
    setEventTitle("");
    setShowForm(false);
  }

  const handleEditEvent = async () => {
    if (!editingEvent) return;
    
    const { error } = await supabase
      .from("calendar_events")
      .update({ title: editingEvent.title })
      .eq("id", editingEvent.id);

    if (error) {
      alert("Failed to update event. Please try again.");
      return;
    }

    setEvents(prev => prev.map(ev => 
      ev.id === editingEvent.id ? { ...ev, title: editingEvent.title } : ev
    ));
    setEditingEvent(null);
  };

  const handleDeleteEvent = async () => {
    if (!deletingEvent) return;
    
    const { error } = await supabase
      .from("calendar_events")
      .delete()
      .eq("id", deletingEvent.id);

    if (error) {
      alert("Failed to delete event. Please try again.");
      return;
    }

    setEvents(prev => prev.filter(ev => ev.id !== deletingEvent.id));
    setDeletingEvent(null);
  };

  // Add a helper to get team name by id
  function getTeamName(teamId: string) {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : "Unknown Team";
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-[#123458] mb-6">Calendar</h1>
          <div className="text-[#123458]">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#123458] mb-6">Calendar</h1>
        <Calendar
          onChange={(value) => setDate(value)}
          value={date}
          className="w-full rounded-xl border border-[#D4C9BE] shadow"
          tileClassName={({ date, view }) => {
            if (view === "month") {
              const hasEvent = events.some(e => {
                const eventDate = new Date(e.date);
                return (
                  eventDate.getDate() === date.getDate() &&
                  eventDate.getMonth() === date.getMonth() &&
                  eventDate.getFullYear() === date.getFullYear()
                );
              });
              
              // Check if this is today's date
              const isToday = date.toDateString() === new Date().toDateString();
              
              // Check if this is the selected date
              const selectedDate = Array.isArray(date) ? date : date;
              const isSelected = selectedDate.toDateString() === date.toDateString();
              
              if (isToday) {
                return hasEvent
                  ? "calendar-has-event-today bg-gray-500 text-white font-bold"
                  : "bg-gray-500 text-white font-bold";
              }
              
              if (isSelected && !isToday) {
                return hasEvent
                  ? "calendar-has-event bg-[#123458] text-white font-bold"
                  : "bg-[#123458] text-white font-bold";
              }
              
              if (hasEvent) {
                return "calendar-has-event text-black font-bold";
              }
            }
            return undefined;
          }}

        />
        <div className="mt-6 text-black text-lg flex items-center gap-4">
          Selected: <span className="font-semibold">{formatDateDDMMYYYY(date as Date)}</span>
          <button
            className="ml-2 px-3 py-1 rounded bg-[#123458] text-white hover:bg-[#D4C9BE] hover:text-[#123458] transition text-sm font-semibold"
            onClick={() => setShowForm((v) => !v)}
          >
            + Add an Event
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleAddEvent} className="mt-4 w-full flex flex-col gap-2 items-center">
            {/* Team selection is required for all events */}
            <label htmlFor="team-select" className="w-full text-left font-semibold text-[#123458]">Select Team <span className="text-red-500">*</span></label>
            <select
              id="team-select"
              value={selectedTeamId}
              onChange={e => setSelectedTeamId(e.target.value)}
              className="w-full px-3 py-2 rounded border border-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458] text-black"
              required
            >
              <option value="" disabled>Select team</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Event title"
              className="w-full px-3 py-2 rounded border border-[#123458] focus:outline-none focus:ring-2 focus:ring-[#123458] text-black placeholder-black"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-1 rounded bg-[#123458] text-white hover:bg-[#D4C9BE] hover:text-[#123458] transition font-semibold"
                disabled={!selectedTeamId}
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-1 rounded bg-gray-200 text-[#123458] hover:bg-gray-300 transition font-semibold"
                onClick={() => { setShowForm(false); setEventTitle(""); }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        <div className="mt-6 w-full">
          <h2 className="text-lg font-bold text-black mb-2">Events for {formatDateDDMMYYYY(date as Date)}:</h2>
          {eventsForDate.length === 0 ? (
            <div className="text-black opacity-80">No events for this date.</div>
          ) : (
            <ul className="space-y-2">
              {eventsForDate.map((event) => (
                <li key={event.id} className="bg-[#D4C9BE]/70 rounded px-3 py-2 text-black font-medium shadow-sm flex items-center gap-2 flex-wrap w-full">
                  {editingEvent && editingEvent.id === event.id ? (
                    <>
                      <input
                        type="text"
                        value={editingEvent.title}
                        onChange={ev => setEditingEvent({ ...editingEvent, title: ev.target.value })}
                        className="flex-1 px-2 py-1 rounded border border-[#123458] text-black w-full sm:w-auto"
                        maxLength={60}
                        autoFocus
                      />
                      <div className="flex flex-col sm:flex-row gap-2 w-full">
                        <button
                          className="px-2 py-1 rounded bg-[#123458] text-white hover:bg-[#D4C9BE] hover:text-[#123458] transition text-xs font-semibold w-full sm:w-auto"
                          onClick={handleEditEvent}
                        >Save</button>
                        <button
                          className="px-2 py-1 rounded bg-gray-200 text-[#123458] hover:bg-gray-300 transition text-xs font-semibold w-full sm:w-auto"
                          onClick={() => setEditingEvent(null)}
                        >Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="flex-1">{event.title}</span>
                      <span className="ml-2 text-xs text-[#123458]/80 font-semibold">[{getTeamName(event.team_id)}]</span>
                      <button onClick={() => setEditingEvent(event)}><PencilIcon className="w-4 h-4 text-gray-400 hover:text-blue-500 transition" /></button>
                      <button onClick={() => setDeletingEvent(event)}><TrashIcon className="w-4 h-4 text-gray-400 hover:text-red-500 transition" /></button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deletingEvent && (
        <Dialog open={!!deletingEvent} onClose={() => setDeletingEvent(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
          <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col items-center gap-6 w-full max-w-xs border border-[#D4C9BE]">
            <Dialog.Title className="text-lg font-bold text-[#123458]">Delete this event?</Dialog.Title>
            <div className="text-[#123458]/80 mb-4 text-center">Are you sure you want to delete &quot;{deletingEvent.title}&quot;?</div>
            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition w-full sm:w-auto" onClick={handleDeleteEvent}>Yes, Delete</button>
              <button className="px-5 py-2 rounded-lg bg-gray-200 text-[#123458] font-semibold hover:bg-gray-300 transition w-full sm:w-auto" onClick={() => setDeletingEvent(null)}>Cancel</button>
            </div>
          </Dialog.Panel>
        </Dialog>
      )}

      <style jsx global>{`
        /* Make all calendar date numbers black */
        .react-calendar__tile,
        .react-calendar__month-view__days__day,
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #000 !important;
        }
        .react-calendar__navigation button {
          color: #000 !important;
        }
        .react-calendar__month-view__weekdays__weekday {
          color: #000 !important;
        }
        ul.space-y-2 > li {
          color: #000 !important;
        }
        /* Hide neighboring month dates */
        .react-calendar__tile--neighboringMonth,
        .react-calendar__month-view__days__day--neighboringMonth {
          visibility: hidden !important;
          display: none !important;
        }
        /* Override any yellow highlighting for today */
        .react-calendar__tile--now,
        .react-calendar__month-view__days__day--now,
        .react-calendar__tile[aria-label*="today"],
        .react-calendar__month-view__days__day[aria-label*="today"],
        .react-calendar__tile--active,
        .react-calendar__month-view__days__day--active {
          background-color: #6b7280 !important;
          color: white !important;
          border: 2px solid #4b5563 !important;
        }
        .react-calendar__tile--now:hover,
        .react-calendar__month-view__days__day--now:hover,
        .react-calendar__tile--active:hover,
        .react-calendar__month-view__days__day--active:hover {
          background-color: #4b5563 !important;
        }
        /* Additional override for any yellow backgrounds */
        .react-calendar__tile[style*="yellow"],
        .react-calendar__month-view__days__day[style*="yellow"] {
          background-color: #6b7280 !important;
          color: white !important;
        }
        /* Dot below days with events */
        .calendar-has-event {
          position: relative;
        }
        .calendar-has-event::after {
          content: "";
          display: block;
          margin: 0 auto;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #123458;
          margin-top: 2px;
        }
        /* Dot for today with event (slightly larger or different color if desired) */
        .calendar-has-event-today {
          position: relative;
        }
        .calendar-has-event-today::after {
          content: "";
          display: block;
          margin: 0 auto;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: white;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
} 