//package com.company;
//
//class negativeRadiusException extends Exception{
//    public String toString(){
//        return super.toString()+" Radius cant be negative";
//    }
//}
//class zeroDenominator extends Exception{
//    public String toString(){
//        return super.toString()+" Denominator cant be zero";
//    }
//}
//class area{
//    area(int radius)throws negativeRadiusException{   //throws only denotes that this method throws exception so be prepared with try catch
//        if(radius<0){
//            throw new negativeRadiusException();
//        }
//        else {
//            System.out.println(Math.PI * radius * radius);
//        }
//    }
//}
//
//class divide{
//    divide(int a, int b) throws ArithmeticException{
//        if(b==0){
//            try {
//                throw new zeroDenominator();
//            }
//            catch (Exception e){
//                System.out.println(e);
//            }
//
//        }
//        else {
//            System.out.println(a / b);
//        }
//    }
//}
//public class tut84_ThrowVSThrows {
//    public static void main(String[] args) {
//        try {
//            area kl=new area(-5);
//        }
//        catch (Exception e){
//            System.out.println(e);
//        }
//
//
//        try{
//            divide ik=new divide(5,0);
//        }
//        catch (Exception y){
//            System.out.println(y);
//        }
//    }
//}
