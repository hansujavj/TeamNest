package com.company;

import java.util.*;

public class tut91_ArrayList {
    public static void main(String[] args) {
        ArrayList<Integer> l1=new ArrayList<>();
        ArrayList<Integer> l2=new ArrayList<>();
        l1.add(6);
        l1.add(4);
        l1.add(5);
        l1.add(3);
        l1.add(0,1);  //it adds element at end of list, to add at start use (0,element)
        l1.add(0,5);
        l1.set(1,156);  //it delete element on that index and set new

        l2.add(12);
        l2.add(17);
        l2.add(16);
        l2.add(75);

        l1.addAll(l2);
        //l2.clear();

        System.out.println(l1.contains(7));
        System.out.println(l1.indexOf(5));
        System.out.println(l1.lastIndexOf(5));   //if in list a no. is in 2 times so to get 2nd index of no. we use this

//        System.out.println(l1);
        //can also be done in this way
        for(int i=0;i<l1.size();i++){
            System.out.println(l1.get(i));
        }

//        System.out.println(l2);
    }
}
