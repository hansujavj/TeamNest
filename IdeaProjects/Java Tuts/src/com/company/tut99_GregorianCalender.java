package com.company;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;

public class tut99_GregorianCalender {
    public static void main(String[] args) {
        Calendar c=Calendar.getInstance();
        System.out.println(c.get(Calendar.DATE));   //to print present date from calender class
        System.out.println(c.get(Calendar.YEAR));
        System.out.println(c.get(Calendar.SECOND));
        System.out.println(c.get(Calendar.HOUR_OF_DAY)+":"+c.get(Calendar.MINUTE)+":"+c.get(Calendar.SECOND));

        GregorianCalendar cal=new GregorianCalendar();
        System.out.println(cal.isLeapYear(2022));
        System.out.println(cal.isLeapYear(Calendar.YEAR));   //to find if present year is leap year

        System.out.println(TimeZone.getAvailableIDs()[2]);
        System.out.println(TimeZone.getAvailableIDs()[1]);
        System.out.println(TimeZone.getAvailableIDs()[0]);
    }
}
