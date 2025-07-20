//package com.company;
//
//
//class myRunnable implements Runnable{
//    public void run(){
//        int i=0;
//        while (i<400) {
//            System.out.println("I am a thread");
//            i++;
//        }
//    }
//}
//class mRunnable implements Runnable{
//    public void run(){
//        int i=0;
//        while (i<400) {
//            System.out.println("I am a in mrunnable");
//            i++;
//        }
//    }
//}
//public class tut71_MultithreadingRunnable {
//    public static void main(String[] args) {
//        myRunnable bullet1=new myRunnable();
//        Thread gun1=new Thread(bullet1);
//        mRunnable bullet2=new mRunnable();
//        Thread gun2=new Thread(bullet2);
//        gun1.start();
//        gun2.start();
//    }
//}
