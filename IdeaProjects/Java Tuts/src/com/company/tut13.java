package com.company;
import java.util.Scanner;

public class tut13 {
    public static void main(String[] args) {
        String name=new String("difkchsdifcsbhdj");
        System.out.println(name);

        String nme="sdvbh";
        System.out.println(nme);

        int a=76;
        float b=7.67687f;
        System.out.printf("Hi %s and %s",name,nme);
        System.out.format("\njkj %d and %d",a,a);

        /*
        %d for int
        %f for float
        %d for double
        %s for string
        %c for char
         */

        Scanner fg=new Scanner(System.in);
        String st=fg.nextLine();
        System.out.println(st);
    }
}
