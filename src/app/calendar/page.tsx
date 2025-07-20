"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import "react-calendar/dist/Calendar.css";

const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

type Value = Date | Date[] | null;

export default function CalendarPage() {
  const [date, setDate] = useState<Value>(new Date());
  const [events, setEvents] = useState<{ date: string; title: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [eventTitle, setEventTitle] = useState("");

  function formatDateDDMMYYYY(date: Date) {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  }

  const selectedDateStr = date ? (Array.isArray(date) ? date[0]?.toDateString() : date.toDateString()) : '';
  const eventsForDate = events.filter((e) => e.date === selectedDateStr);

  function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    if (!eventTitle.trim()) return;
    setEvents((prev) => [...prev, { date: selectedDateStr, title: eventTitle.trim() }]);
    setEventTitle("");
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F5F9] to-[#E0E7EF] flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white/90 rounded-2xl shadow-lg p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#123458] mb-6">Calendar</h1>
        <Calendar
          onChange={setDate}
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
              if (date.toDateString() === new Date().toDateString()) {
                return hasEvent
                  ? "calendar-has-event-today text-black font-bold"
                  : "bg-[#D4C9BE] text-[#123458] font-bold";
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
              {eventsForDate.map((e, i) => (
                <li key={i} className="bg-[#D4C9BE]/70 rounded px-3 py-2 text-black font-medium shadow-sm">
                  {e.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
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
          background: #123458;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
} 