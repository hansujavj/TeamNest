package com.company;

import java.util.Scanner;

public class tut82_NestedTryCatch {
    public static void main(String[] args) {
        int[]arr=new int[5];
        arr[0]=1;
        arr[1]=5;
        arr[2]=6;
        arr[3]=56;
        Scanner sc=new Scanner(System.in);
//        System.out.println("Enter the index of array");
//        int a=sc.nextInt();
//        System.out.println("ENter number u want to divide with ");
//        int b=sc.nextInt();
//        try {
//            System.out.println("in level 1");
//            try {     //this is useful for things like catching specific exceptions if occured in
//                int c=arr[a]/b;
//                System.out.println(c);
//            }
//            catch (ArrayIndexOutOfBoundsException e){
//                System.out.println("Index out of bound");
//            }
//        }
//        catch (Exception e){    //else this catch catches other errors
//            System.out.println("Error occured");
//        }


        boolean file=true;    //just putting everything in while loop
        while (file){
            System.out.println("Enter the index of array");
            int a=sc.nextInt();
            System.out.println("ENter number u want to divide with ");
            int b=sc.nextInt();
            try {
                System.out.println("in level 1");
                try {
                    int c=arr[a]/b;
                    System.out.println(c);
                    file=false;
                }
                catch (ArrayIndexOutOfBoundsException e){
                    System.out.println("Index out of bound");
                }
            }
            catch (Exception e){    //else this catch catches other errors
                System.out.println("Error occured");
            }
        }
        System.out.println("Code fully executed");
    }
}
