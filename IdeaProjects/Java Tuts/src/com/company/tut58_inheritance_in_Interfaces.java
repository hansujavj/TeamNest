package com.company;

interface sampleSpace{
    void mech1();
    void mech2();
}
interface mySample extends sampleSpace{
    void mech3();
    void mech4();
}
class sample implements mySample{
    public void mech1(){
        System.out.println("Hello");
    }
    public void mech2(){
        System.out.println("Hi");
    }
    public void mech3(){
        System.out.println("hola");
    }
    public void mech4(){
        System.out.println("hela");
    }
    public void mech5(){
        System.out.println("dvsdv");
    }
}
public class tut58_inheritance_in_Interfaces {
    public static void main(String[] args) {
        sample bn=new sample();
        bn.mech5();
        bn.mech3();
    }
}
