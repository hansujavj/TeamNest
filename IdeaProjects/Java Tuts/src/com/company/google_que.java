package com.company;
import java.util.Scanner;

public class google_que {
    public static void main(String[] args) {

        Scanner gh = new Scanner(System.in);
        System.out.println("Type a number");
//        int a= gh.nextInt();
//        int b=1;
//        while (b<=a){
//            System.out.println(b);
//            b++;
//        }

        int a = gh.nextInt();
        int b=0;
        int sum=0;
        while (b<a){
            b=b+2;
            if (b<a){
                sum=sum + b;
                System.out.println(b);
            }
        }
        System.out.println(sum/2);
    }
}
