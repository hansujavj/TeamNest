//package com.company;
//interface camera{
//    void takesnap();
//    void openCam();
//}
//interface wifi{
//    void searchNet();
//    void openWifi();
//    default void connectTo(String WifiName){
//        System.out.println("Connecting to "+WifiName);
//    }
//}
//interface music{
//    default void playMusic(String MusicName){
//        System.out.println("Playing "+MusicName);
//    }
//    void pause();
//    void play();
//}
//class SmartPhone implements music,wifi,camera{
//    public void takesnap(){
//        System.out.println("Taking Picture");
//    }
//    public void openCam(){
//        System.out.println("Opening Camera");
//    }
//    public void searchNet(){
//        System.out.println("Searching Network");
//    }
//    public void openWifi(){
//        System.out.println("Opening wifi");
//    }
//
//    @Override
//    public void pause() {
//        System.out.println("Pausing music");
//    }
//
//    @Override
//    public void connectTo(String WifiName) {
//        wifi.super.connectTo(WifiName);
//    }
//    public void play(){
//        System.out.println("Playing music");
//    }
//
//}
//public class tut59_polymorphism {
//    public static void main(String[] args) {
//        music bn=new SmartPhone();
//        bn.pause();       //as u have chose music bn=new smartphone so only music functions are applied
//    }
//}
