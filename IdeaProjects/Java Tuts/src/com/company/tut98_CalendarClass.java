package com.company;

import java.util.Calendar;
import java.util.TimeZone;

public class tut98_CalendarClass {
    public static void main(String[] args) {
        Calendar c=Calendar.getInstance();
        System.out.println(c.getCalendarType());
        System.out.println(c.getTimeZone());

        Calendar d=Calendar.getInstance(TimeZone.getTimeZone("Asia/Singapore"));
        System.out.println(d.getCalendarType());
        System.out.println(d.getTimeZone().getID());
        System.out.println(d.getTime());
        System.out.println(d.getWeekYear());
        System.out.println(d.getFirstDayOfWeek());
    }
}
