package com.company;

class A{
    public void A(){
        System.out.println(4);
    }
}

class B extends A{
    @Override   //it is used to denote that it is overriden (not necessary)
    public void A(){
        System.out.println(5);
    }
}

public class tut48_Method_Overriding {
    public static void main(String[] args) {

        B b=new B();
        b.A();      //both are having same method A bt as I have said b=new B so it will use A from B(Method Overriding)
    }
}
