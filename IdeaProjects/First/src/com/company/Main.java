package com.company;

import java.util.Locale;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
//        System.out.println("Hello World");
        // taking inputs
//        Scanner scan = new Scanner(System.in);
//        System.out.print("Enter input:");
//        String input= scan.next();  // to print string before space
//        String inpt= scan.nextLine();  // to print whole line
//        System.out.println(input);
//        System.out.println(inpt);
//        System.out.println(inpt.length());
//        System.out.println(inpt.toUpperCase());
//        System.out.println("hi how aqre \"you\"");   // \" to print double quote   \\ to print \
//
//        System.out.println(input.contains("har"));   // to find weather it contain or not
//        System.out.println(inpt.charAt(2));
//        System.out.println(inpt.indexOf("har"));

//        int num1=7, num2=56;
//        System.out.println(Math.max(num1,num2));
//        System.out.println(Math.sqrt(36));
//        System.out.println(Math.abs(-36));  // gives +ve value
//        System.out.println(Math.abs(36));
//        System.out.println(Math.random());
//        System.out.println(4+(8-4)*Math.random());   // to print no between 4 to 8


//        Scanner scan=new Scanner(System.in);
//        System.out.println("Enter your age:");
//        int age= scan.nextInt();   // to take input as a no.


        //If else statement
//        if(age<20) {
//            System.out.println("you are an adult");
//        }
//        else if (age>5){                     // if you didnt put else if then fun will try to search in every condition
//            System.out.println("Your age is considered");
//        }
//        else{
//            System.out.println("Pls reconsider your age");
//            }


        //SWITCH STATEMENT
//        switch (age) {
//            case 12:
//                System.out.println("you are 12 years old");
//                break;           // if you dont put break here then it will print all the other cases
//            case 14:
//                System.out.println("You are 14 years old");   // try putting 14 here
//            case 15:
//                System.out.println("You are 15 years old");
//                break;
//            default:
//                System.out.println("youn are" + age + " years old");
//        }
//        System.out.println(age*=3);


        //Quiz
//        System.out.println("Enter a no.:");
//        int no=scan.nextInt();
//        switch (no){
//            case 1:
//                System.out.println("Sunday");
//                break;
//            case 2:
//                System.out.println("Monday");
//                break;
//            case 3:
//                System.out.println("Tuesday");
//                break;
//            case 4:
//                System.out.println("Wednesday");
//                break;
//            case 5:
//                System.out.println("Thursday");
//                break;
//            case 6:
//                System.out.println("Friday");
//                break;
//            case 7:
//                System.out.println("saturday");
//        }


        //WHILE LOOP
//        int i=0;
//        while (i<100){
//            System.out.println(i);
//            i=i+1;
//        }
//
//        int a=14;
//        System.out.println(a++);
//        System.out.println(a--);  // it prints first then decrease
//        System.out.println(a-=3);
//        System.out.println(--a);   // it decrease first then print
//        System.out.println(++a);


        //DO WHILE LOOP
//        int h=10;
//        do{
//            System.out.println("Hi");
//            h+=1;
//        }while (h<9);    // it will always run atleast one time


        //FOR LOOP
        //for(statement 1;statement 2; statement 3)
        //    ( value    ; condition ; iteration)

//        for(int i=0;i<10;i=i+2){
//            System.out.println("ho");
//        }

//        int [] marks= {1,5,3,4};
//        marks[3]=14;
//        System.out.println(marks[2]);
//
//        // to iterate the array
//        for(int i=0;i<=marks.length;i+=1) {
//            System.out.println(i);
//        }
//        //another method to iterate
//        for (int values:marks){
//            System.out.println(values);
//        }
//        int [][] valu={{1,2,3},{5,7,4},{9,7,8}};
//        System.out.println(valu[0][1])  ;

        String [] values={"harry","Anand","Mamta","Vilas"};
//        System.out.println(values[5]);     //because of this error next line didnt execute so we use try and catch
//        System.out.println("masoon");

        try {
            System.out.println(values[5]);
        }
        catch (Exception r){        //with try catch should be there
//            System.out.println(r);
        }
        System.out.println("masoom");
    }

}
