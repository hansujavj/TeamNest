package com.company;


class myThread extends  Thread{
    public  void run(){
        int i=0;
        while (i<400){
            System.out.println("Good Morning");

            try {
                Thread.sleep(10);
            } catch (InterruptedException e) {
                e.printStackTrace();

            }
            i++;
        }
    }
}
class MyThrea extends Thread{
    public void run(){
        int i=0;
        while (i<400){
            System.out.println("Good Evening");
            i++;
        }
    }
}
public class tut76_ThreadPractice {
    public static void main(String[] args) {
        myThread t1=new myThread();
        MyThrea t2=new MyThrea();
        t1.setPriority(6);
        t2.setPriority(10);

        System.out.println(t1.getState());   //to get state of thread
        System.out.println(t2.getState());

        t1.start();
        System.out.println(Thread.currentThread().getState());    //it will give state of running thread
        t2.start();

        System.out.println(t1.getState());
        System.out.println(t2.getState());
    }
}
