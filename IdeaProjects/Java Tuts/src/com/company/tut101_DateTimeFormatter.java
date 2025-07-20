package com.company;

import javax.swing.text.DateFormatter;
import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class tut101_DateTimeFormatter {
    public static void main(String[] args) {
        LocalDateTime fg=LocalDateTime.now();
        System.out.println(fg);

        DateTimeFormatter kk=DateTimeFormatter.ofPattern("dd-mm-yy    hh:mm   E");
        String myDate=fg.format(kk);
        System.out.println(myDate);

        DateTimeFormatter hj=DateTimeFormatter.ISO_LOCAL_DATE;
        String dt= fg.format(hj);
        System.out.println(dt);
    }
}
