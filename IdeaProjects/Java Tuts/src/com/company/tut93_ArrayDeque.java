package com.company;

import java.util.ArrayDeque;

public class tut93_ArrayDeque {
    public static void main(String[] args) {
        ArrayDeque<Integer>dq1=new ArrayDeque<>();
        dq1.add(2);
        dq1.add(6);
        dq1.add(5);
        dq1.add(8);
        dq1.addFirst(9);     //this will throws exception if element cant be added at first or last
        dq1.addLast(23);
        dq1.offerFirst(56);  // this wont throw exception

        System.out.println(dq1);
        System.out.println(dq1.getFirst());
        System.out.println(dq1.getLast());


        dq1.removeFirst();        //this will throw exception
        dq1.pollFirst();           //this wont

        dq1.getFirst();        //this will throw exception
        dq1.peekFirst();      //this wont
    }
}
