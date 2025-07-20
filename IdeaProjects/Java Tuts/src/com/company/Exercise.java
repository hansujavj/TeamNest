package com.company;
import java.util.Scanner;

public class Exercise {
    public static void main(String[] args) {
        System.out.println(7/4f*9/2f);

        char grade='B';
        grade=(char)(grade+8);
        System.out.println(grade);
        System.out.println((char)(grade-8));


        Scanner fg=new Scanner(System.in);
//        float a=fg.nextFloat();
//        System.out.println(a>8);

        System.out.print("v=");
        float v=fg.nextFloat();
        System.out.print("u=");
        float u=fg.nextFloat();
        System.out.print("a=");
        float a=fg.nextFloat();
        System.out.print("s=");
        float s=fg.nextFloat();
        System.out.println((float) ((v*v-u*u)/(2*a*s)));

    }
}
