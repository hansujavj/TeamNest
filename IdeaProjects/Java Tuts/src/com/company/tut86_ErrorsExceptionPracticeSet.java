package com.company;

import java.util.Scanner;

public class tut86_ErrorsExceptionPracticeSet {
    public static void main(String[] args) {
//        int i=0   //syntax error(not applied ";"

//        System.out.println(6/0);   //runtime error

        int i=0;
        int[]array={1,2,3,4};

        while (i<5){
            try {
                System.out.println("Enter index");
                Scanner sc=new Scanner(System.in);
                int index=sc.nextInt();
                System.out.println(array[index]);
                break;
            }
            catch (Exception e){
                System.out.println("Enter valid index");
            }
            i++;
        }
    }
}
