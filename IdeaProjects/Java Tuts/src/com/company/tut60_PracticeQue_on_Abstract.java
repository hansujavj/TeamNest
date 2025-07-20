package com.company;

//Problem 1
//abstract class pen{
//    abstract void write();
//    abstract void refill();
//}
//class FountainPen extends pen{
//    @Override
//    void write() {
//        System.out.println("Writing with pen");
//    }
//
//    @Override
//    void refill() {
//        System.out.println("Refilling the pen");
//    }
//    void chageNib(){
//        System.out.println("Changing Nib");
//    }
//}

//Problem 3
//interface BasicAnimals{
//    void bite();
//    void sleep();
//}
//class monkey{
//    public void jump(){
//        System.out.println("Jumping");
//    }
//    public void eat(){
//        System.out.println("Eating");
//    }
//}
//class Human extends monkey implements BasicAnimals{
//    @Override
//    public void bite() {
//        System.out.println("Biting");
//    }
//
//    @Override
//    public void sleep() {
//        System.out.println("Sleeping");
//    }
//}

//Problem 4
//abstract class telePhone{
//    abstract void lift();
//    abstract void ring();
//    abstract void disconnect();
//}
//class SmartPhone extends telePhone{
//    @Override
//    void lift() {
//        System.out.println("Picking up Phone");
//    }
//
//    @Override
//    void disconnect() {
//        System.out.println("Disconnecting call");
//    }
//
//    @Override
//    void ring() {
//        System.out.println("Ringing");
//    }
//    public void takeSnap(){
//        System.out.println("Clicking picture");
//    }
//    public void wifiOn(){
//        System.out.println("Turning on wifi");
//    }
//}

//Problem 6
//interface TvRemote{
//    void clickButton();
//    void shutDown();
//    void switchOn();
//}
//interface SmartRemote extends TvRemote{
//    void voiceCmd();
//    void smartControl();
//}
//class Tv implements TvRemote{
//    @Override
//    public void clickButton() {
//        System.out.println("Pressed button");
//    }
//
//    @Override
//    public void shutDown() {
//        System.out.println("Shutting down");
//    }
//
//    @Override
//    public void switchOn() {
//        System.out.println("Switching on");
//    }
//}

public class tut60_PracticeQue_on_Abstract {
    public static void main(String[] args) {
        //Problem 1
//        FountainPen bn=new FountainPen();
//        bn.write();
//        bn.chageNib();

        //Problem 3
//        Human mn=new Human();
//        mn.jump();
//        mn.bite();

        //Problem 5
//        monkey m1=new Human();
//        m1.eat();


        //Problem 4
//        telePhone bn=new SmartPhone();
//        bn.disconnect();
//        bn.wifiOn();      //Wont work as this method is in SmartPhone

        //Problem 7
//        TvRemote gh=new Tv();
//        gh.switchOn();
    }
}
