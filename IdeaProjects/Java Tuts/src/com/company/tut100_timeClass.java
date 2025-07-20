package com.company;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class tut100_timeClass {
    public static void main(String[] args) {
        LocalDate c=LocalDate.now();
        System.out.println(c);

        LocalTime t=LocalTime.NOON;
        System.out.println(t);

        LocalTime j=LocalTime.of(5,8,45);
        System.out.println(j);

        LocalTime m=LocalTime.now();
        System.out.println(m);

        LocalDateTime g=LocalDateTime.now();
        System.out.println(g);

        System.out.println(LocalTime.now());
    }
}
