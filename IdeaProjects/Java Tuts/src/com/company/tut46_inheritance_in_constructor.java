//package com.company;
//
//class Base{
//    int x;
//    public Base(){
//        System.out.println("I am a constructor");
//    }
//    public void setX(int X){
//        x=X;
//    }
//    public int getX(){
//        return x;
//    }
//    public Base(int a){
//        System.out.println("I am from Base having a value of "+a);
//    }
//}
//
//class derived extends Base{
//    public derived(){
//        System.out.println("Hi I am derived");
//    }
//}
//
//class de1 extends derived{
//    public de1(){
//        System.out.println("Hi, I am de1");
//    }
//}
//
//class de2 extends Base{
//    public de2(){
//        super(2);      //is use to invoke an overloaded constructor, if not used will invoke normal constructor
//        System.out.println("I am from de2");
//    }
//}
//class de3 extends Base{
//    public de3(){
//        System.out.println("I am basic de3");
//    }
//    public de3(int x,int y){
//        super(x);
//        System.out.println("I am from de3 having value "+y);
//    }
//}
//class de4 extends de3{
//    public de4(int a, int b, int c){
//        super(a,b);
//        System.out.println("I am from de4, c value is "+c);
//    }
//
//}
//public class tut46_inheritance_in_constructor {
//    public static void main(String[] args) {
////        de1 vb=new de1();
////        de2 bn=new de2();
////        de3 bh=new de3(5,8);
//        de4 nm=new de4(4,5,6);
//    }
//}
