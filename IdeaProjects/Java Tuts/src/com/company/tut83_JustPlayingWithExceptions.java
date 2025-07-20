//package com.company;
//
//
//import java.util.Scanner;
//
//class MException extends Exception{
//    public String toString(){      //it is used to get message that this exception has occured
//        return "Divident cant be zero";
//    }
//}
//public class tut83_JustPlayingWithExceptions {
//    public static void main(String[] args) {
//        int a=10;
//        Scanner sc=new Scanner(System.in);
//        int b=sc.nextInt();
//        if(b==0){
//            try {
//                throw new MException();
//            }
//            catch (Exception e){
//                System.out.println(e.toString());
//            }
//        }
//        else {
//            System.out.println(a / b);
//        }
//    }
//}
