package com.company;
import java.util.Scanner;

public class clas {

    //Methods in Java
    static void printNumberUpto(int b){
        for(int i=1;i<=b;i++){
            System.out.println(i);
        }
    }


    static void printSquaresUpto(int b){
        for(int i=1;i<=b;i++){
            System.out.println(i*i);
        }
    }


//    static void hello(int a){
//        System.out.println(a*4);
//    }


//    static void sayHelloWorldThrice(){
//        System.out.println("Hello World");
//        System.out.println("Hello World");
//        System.out.println("Hello World");
//    }


    static void printHello(int a){
        for(int i=0;i<a;i++) {
            System.out.println("Hello");
        }
    }


    static void printMultiplicationTable(int a){
        for(int i=1;i<=10;i++){
            System.out.printf("%d*%d=%d\n",a,i,a*i);
        }
    }


    public static void main(String[] args) {    //Main Code

//        System.out.println(Math.min(45, 56));
//        System.out.println(Math.random());


        Scanner gh = new Scanner(System.in);


        int a=gh.nextInt();
//        printHello(a);
//        printNumberUpto(a);
//        printSquaresUpto(a);
        printMultiplicationTable(a);

//        System.out.println("Type angle 1");
//        int angle1 = gh.nextInt();
//        System.out.println("Type angle 2");
//        int angle2 = gh.nextInt();
//        System.out.println("Type angle 3");
//        int angle3 = gh.nextInt();
//        if (angle1 + angle2 + angle3 == 180) {
//            System.out.println("Given angles belong to a triangle");
//        } else {
//            System.out.println("Given angles doesnot belong to a triangle");
//        }



//        Scanner gh = new Scanner(System.in);
//        int number= gh.nextInt();
//        if (number%2==0){
//            System.out.println("Its an even number");
//        }
//        else{
//            System.out.println("Its an odd number");
//        }


        //Step 28-29
//        for(int i=10;i>0;i--){
//            System.out.println(i);
//        }



//        int s= gh.nextInt();
//        for(int i=1;i<11;i++){
//            System.out.printf("%d*%d=%d\n",s,i,s*i);
//        }



//        for(int i=1;i<11;i++){
//            System.out.printf("%d*%d=%d\n",i,i,i*i);
//        }



//        int o=0;
//        for(int i=1;i<100;i++){
//            if(i%2==0 & o<10) {
//                System.out.printf("%d*%d=%d\n", i, i, i * i);
//                o++;
//            }
//        }



//        int o=0;
//        for(int i=1;i<100;i++){
//            if(i%2!=0 & o<10) {
//                System.out.printf("%d*%d=%d\n", i, i, i * i);
//                o++;
//            }
//        }

    }
}
