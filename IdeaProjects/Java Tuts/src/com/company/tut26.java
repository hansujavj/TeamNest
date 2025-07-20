package com.company;

public class tut26 {
    public static void main(String[] args) {
        int[]marks=new int[5];  //Declaration and memory allocation
        marks[0]=100;
        marks[1]=20;
        marks[2]=40;
        marks[3]=60;
        marks[4]=50;
        System.out.println(marks[2]);

        String[]h=new String[2];
        h[0]="Hi";
        h[1]="Hi";
        System.out.println(h[1]);

        String[]gh= {"Hi","Hello","Bye"};    //Declaration, memory allocation and initialization
        System.out.println(gh[2]);
    }
}
