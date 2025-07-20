//package com.company;
//
////search for "java thread methods"
//
//class myThread extends  Thread{
//    public myThread(String name){
//        super(name);
//    }
//    public  void run(){
//        int i=0;
//        while (i<400){
//
//            System.out.println("Hello "+this.getName());
//
//            try {
//                Thread.sleep(50);      //it will stop this function for 450 ms(always surround with try catch)
//            } catch (InterruptedException e) {
//                e.printStackTrace();
//            }
//
//            i++;
//        }
//    }
//}
//class mThread extends  Thread{
//    public mThread(String name){
//        super(name);
//    }
//    public  void run(){
//        int i=0;
//
//        while (i<400){
//
//            System.out.println("Hi "+this.getName());
//
//            i++;
//        }
//    }
//}
//public class tut75_ThreadMethods {
//    public static void main(String[] args) {
//        myThread t1=new myThread("Anand");
//        mThread t2=new mThread("Hansu");
//        t1.start();
//
//        try {               //.join has to be in try catch always
//            t1.join();      //this will help to execute t1 first and then t2
//        }
//        catch (Exception e){
//            System.out.println(e);
//        }
//
//        t2.start();
//    }
//}
