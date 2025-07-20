//package com.company;
//
//
//class myThread extends Thread{
//    public void run(){
//        int i=0;
//        while (i<4000) {
//            System.out.println("I am running");
//            System.out.println("I am Anand Jambhale");
//            i++;
//        }
//    }
//}
//class myThread2 extends Thread{
//    public void run(){
//        int i=0;
//        while (i<4000) {
//            System.out.println("Thread 2");
//            System.out.println("is running");
//            i++;
//        }
//    }
//}
//public class tut70_MultiThreading {
//    public static void main(String[] args) {
//        myThread gh=new myThread();
//        myThread2 kl=new myThread2();
//        gh.start();
//        kl.start();    //when u run this u will see that gh run for some time then kl run and so on
//    }
//}
