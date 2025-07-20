package com.company;
import java.util.Scanner;

public class tut21 {
    public static void main(String[] args) {
        int i=100;

//        while (i<=200){
//            System.out.println(i);
//            i=i+1;
//        }

        do{
            System.out.println(i);
            i=i+1;
        }while (i<100);




        Scanner gh=new Scanner(System.in);
        System.out.println("Type a no:");
//        i=gh.nextInt();
//        while (i!=0){
//            System.out.println((int) (i%10));
//            i=(int) (i/10);
//        }

        int u=gh.nextInt();
        i=1;
        do{
            System.out.println(i);
            i++;
        }while (i<u);

    }
}
