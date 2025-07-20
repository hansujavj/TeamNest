package com.company;

import java.util.ArrayList;
import java.util.LinkedList;

public class tut92_linkedList {
    public static void main(String[] args) {
        LinkedList<Integer> l1=new LinkedList<>();  //its methods are also same as arraylist
        ArrayList<Integer> l2=new ArrayList<>();
        l1.add(6);
        l1.add(4);
        l1.add(5);
        l1.add(3);
        l1.add(0,1);  //it adds element at end of list, to add at start use (0,element)
        l1.add(0,5);
        l1.set(1,156);  //it delete element on that index and set new
        System.out.println(l1);
        System.out.println(l1.contains(7));


        l1.addLast(4);   //methods below this are only in lined list
        l1.addFirst(8);
        l1.addFirst(5);
        System.out.println(l1);
    }
}
