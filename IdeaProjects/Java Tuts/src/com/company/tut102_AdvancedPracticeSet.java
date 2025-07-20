package com.company;

import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class tut102_AdvancedPracticeSet {
    public static void main(String[] args) {
        ArrayList o=new ArrayList<>(List.of("Anand","Hansu"));
        System.out.println(o);

        HashSet<Integer> s=new HashSet<>(List.of(1,5,9,8));  //store elements at its %10 index
        System.out.println(s);

        TreeSet kl=new TreeSet<>(List.of(8,7,9,6,4,10));   //always store elements in sorted order
        System.out.println(kl);

        TreeSet jk=new TreeSet<>(List.of("Anand","Billu","Akash"));
        System.out.println(jk);


        Date d=new Date();
        System.out.println(d.getHours()+":"+d.getMinutes());

        Calendar h=Calendar.getInstance();
        System.out.println(h.get(Calendar.HOUR)+":"+h.get(Calendar.MINUTE));


        LocalDateTime fh=LocalDateTime.now();
        DateTimeFormatter j=DateTimeFormatter.ofPattern("hh : mm");
        System.out.println(fh.format(j));
    }
}
