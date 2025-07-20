package com.company;
//hashset put the given integer at its %10 index means 21 will be placed at 21%10=1 index
//if collosion occur means 11 and 21 will be placed at index 1 then it can make an linked list of integers at that place
//it is faster in searching than array

import java.util.HashSet;

public class tut95_HashSet {
    public static void main(String[] args) {
        HashSet<Integer>hash=new HashSet<>();
        hash.add(5);
        hash.add(8);
        hash.add(9);
        hash.add(2);
        hash.add(2);    //repeat number wont add
        System.out.println(hash.size());
        System.out.println(hash);
    }
}
