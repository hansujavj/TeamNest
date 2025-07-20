package com.company;


import java.util.Date;

public class tut97_DateClass {
    public static void main(String[] args) {
        Date d=new Date();
        System.out.println(d.getTime());
        System.out.println(d.getYear());

        Date h=new Date(2000,8,21);
        System.out.println(h.getTime());
        System.out.println(h.getSeconds());
        System.out.println(h.getYear());
    }
}
