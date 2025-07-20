//package com.company;
//
//
//class myThread extends  Thread{
//    public myThread(String name){
//        super(name);
//    }
//    public  void run(){
//        int i=0;
//        while (i<400){
//            System.out.println("Hello "+this.getName());
//            i++;
//        }
//    }
//}
//
//public class tut73_ThreadPriorities {
//    public static void main(String[] args) {
//        myThread t1=new myThread("Yash");
//        myThread t2=new myThread("Dadu");
//        myThread t3=new myThread("Mamta");
//        myThread t4=new myThread("Hansu");
//        myThread t5=new myThread("Vilas");
//        myThread t6=new myThread("Anand (most Imp)");
//        t6.setPriority(Thread.MAX_PRIORITY);   //this is how u set priorities(u can also use integers on place of THREAD.MAX_PRIORITY
//        t1.setPriority(Thread.MIN_PRIORITY);
//        t2.setPriority(Thread.MIN_PRIORITY);
//        t3.setPriority(Thread.MIN_PRIORITY);
//        t4.setPriority(Thread.MIN_PRIORITY);
//        t5.setPriority(Thread.MIN_PRIORITY);
//        t1.start();
//        t2.start();
//        t3.start();
//        t4.start();
//        t5.start();
//        t6.start();
//    }
//}
