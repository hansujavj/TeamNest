package com.company;
import java.util.Scanner;

public class tut33 {
//    static int sum(int a, int b , int c){
//        return a+b+c;
//    }

    static int sum(int...arr){        //IMP it can take unlimited inputs in array format
        int result=0;
        for(int i=0;i< arr.length;i++){
            result=result+arr[i];
        }
        return result;
    }


    static int factorial(int a){
        int fac=1;
        for(int i=1;i<=a;i++) {
            fac= fac*(i);
        }
        return fac;
    }


    static void fibonacci(int a){     //Fibonacci series
        int o=0;
        int k=1;
        for (int i=1;i<=a/2;i++){
            System.out.println(o);
            System.out.println(k);
            o=o+k;
            k=k+o;
        }
    }


//    static int fibonacc(int a) {     //using while loop(not done properly)
//        int i = 1;
//        int o = 0;
//        int k = 1;
//        int h;
//        if (a % 2 == 0) {
//            h = a / 2;
//        } else {
//            h = (a/2)+1;
//        }
//        while (i <= h) {
//            System.out.println(o);
//            if (i!=h) {
//                System.out.println(k);
//            } else {
//                break;
//            }
//            o = o + k;
//            k = k + o;
//            o=o+k;
//            k=k+o;
//            i++;
//        }
//        return o;
//    }


    public static void main(String[] args) {
//        System.out.println(sum(4,5,8,56,4));
//
//        System.out.println(factorial(0));

//        fibonacci(7);

//        fibonacc(8);

    }
}
