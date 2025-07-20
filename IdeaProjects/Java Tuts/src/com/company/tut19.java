package com.company;
import java.sql.Array;
import java.util.Scanner;

public class tut19 {
    public static void main(String[] args) {
//        int a =10;
//        if (a==11) {
//            System.out.println("I am 11");
//        }
//        else{
//            System.out.println("I am not 11");
//        }

            //Problem 2 to find if pass or fail
//        Scanner fg=new Scanner(System.in);
//        System.out.println("Type your marks in Maths. Type it as \"marks outoff\"");
//        int Mat=fg.nextInt();
//        int Mato=fg.nextInt();
//        float MatP=Mat*100/Mato;
//
//        System.out.println("Type your marks in English. Type it as \"marks outoff\"");
//        int Eng=fg.nextInt();
//        int Engo=fg.nextInt();
//        float EngP=Eng*100/Engo;
//
//        System.out.println("Type your marks in Science. Type it as \"marks outoff\"");
//        int Sci=fg.nextInt();
//        int Scio=fg.nextInt();
//        float SciP=Sci*100/Scio;
//
//        float TotalP=(MatP+EngP+SciP)/3.0f;
//
//        if(EngP>=33 && SciP>=33 && MatP>=33 && TotalP>=40){
//            System.out.println("You are passed");
//        }
//        else {
//            System.out.println("You are failed");
//        }


        //Problem 3 income tax
//        Scanner fg=new Scanner(System.in);
//        System.out.println("Type your income");
//        int amt=fg.nextInt();
//        if(amt<500000 && amt>=250000){
//            float tax=amt*5/100.0f;
//            System.out.printf("You have to pay %f tax",tax);
//        }
//        else if(500000<=amt && amt<1000000){
//            float B5=500000*5/100;
//            float A5=(amt-500000)*20/100;
//            System.out.printf("You have to pay %f tax",(B5+A5));
//        }
//        else if(amt>=1000000){
//            float B5=500000*5/100;
//            float B10=500000*20/100;
//            float A10=(amt-1000000)*30/100;
//            System.out.printf("You have to pay %f tax",(B5+B10+A10));
//        }
//        else if(amt<250000){
//            System.out.println("You don't have to pay income tax");
//        }


        //Problem 4 week days
//        Scanner fg=new Scanner(System.in);
//        System.out.println("Type a number");
//        int value=fg.nextInt();
//        switch(value) {
//            case 1 -> System.out.println("Monday");
//            case 2 -> System.out.println("Tueday");
//            case 3 -> System.out.println("Wednesday");
//            case 4 -> System.out.println("Thursday");
//            case 5 -> System.out.println("Friday");
//            case 6 -> System.out.println("Satday");
//            case 7 -> System.out.println("Sunday");
//            default -> System.out.println("Type between 1-7");
//        }




        //Problem 5 leap year
//        Scanner fg=new Scanner(System.in);
//        System.out.println("Type a year");
//        int year=fg.nextInt();
//        if (year%4==0){
//            System.out.println("This is a leap year");
//        }
//        else {
//            System.out.println("This is not a leap year");
//        }


        //Problem 6 URLs
        Scanner fg=new Scanner(System.in);
        System.out.println("Type a URL");
        String url=fg.next();
        if (url.endsWith(".com")){
            System.out.println("This is a commercial website");
        }
        else if(url.endsWith(".org")){
            System.out.println("This is a Organisational website");
        }
        else if(url.endsWith(".in")){
            System.out.println("This is an Indian website");
        }


    }
}
