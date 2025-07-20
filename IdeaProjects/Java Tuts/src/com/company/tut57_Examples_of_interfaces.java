//package com.company;
//
//interface camera{
//    void takeSnap();
//    void recordVideo();
//    default void recordIn4k(){       //can also be overriden
//        greet();
//        System.out.println("Recording in 4k");
//    }
//    private void greet(){
//        System.out.println("Good evening");
//    }
//}
//interface wifi{
//    void connectToNetwork(String WiName);
//}
//class mycell{
//    void callNum(long number){
//        System.out.println("Calling number "+number);
//    }
//    void pickCall(){
//        System.out.println("Call has been picked");
//    }
//}
//class mySmartphone extends mycell implements camera,wifi {
//    public void takeSnap(){}
//    public void recordVideo(){}
//    public  void connectToNetwork(String WiName){
//        System.out.println("Connecting to "+WiName);
//    }
//}
//public class tut57_Examples_of_interfaces {
//    public static void main(String[] args) {
//        mySmartphone bn=new mySmartphone();
//        bn.connectToNetwork("Mate");
//        bn.recordVideo();
//        bn.takeSnap();
//        bn.callNum(1234567891);
//        bn.recordIn4k();
//    }
//}
