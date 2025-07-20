//package com.company;
//
//
//import java.util.Scanner;
//
//class myException extends Exception{
//    public String toString(){
//        return super.toString()+"I am toString()";
//    }
//    public String getMessage(){
//        return super.getMessage()+"I am get Message";
//    }
//}
//public class tut83_ExceptionClass {
//    public static void main(String[] args) {
//        Scanner sc=new Scanner(System.in);
//        int a= sc.nextInt();
//        if(a<99){
//            try {
//                throw new myException();
//            }
//            catch (Exception e){
//                System.out.println(e.getMessage());
//                System.out.println(e.toString());
//            }
//        }
//    }
//}
