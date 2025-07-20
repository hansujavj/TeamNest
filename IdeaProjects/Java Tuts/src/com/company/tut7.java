package com.company;
import java.util.Scanner;

public class tut7 {
    public static void main(String[] args) {
//        System.out.println("give 1st no");
        Scanner fg=new Scanner(System.in);
//        int first=fg.nextInt();
//        System.out.println("give 2nd no");
//        int second=fg.nextByte();
//        System.out.println("give 3rd no");
//        int thiord=fg.nextByte();
//        int sum=first+second+thiord;
//        System.out.println(sum);

          //Short
//        System.out.println("Give 3 no:");
//        int first=fg.nextByte();
//        int second= fg.nextByte();
//        int third=fg.nextByte();
//        int sum=first+second+third;
//        System.out.println(sum);

//        System.out.println("Type your name:");
//        String name=fg.next();
//        System.out.println("Hello " + name + " have a good day");


//        System.out.println("Type no. in Km:");
//        boolean h= fg.hasNextInt();
//        float KM=fg.nextByte();
//
//        if (h==true);
//
//            System.out.println("In miles it is "+KM*0.621371);
//        if (h==false);
//            System.out.println("Type a number");


        Scanner sg=new Scanner(System.in);
        System.out.println("Type a number");
        int no=sg.nextInt();
        do {
            System.out.println(no%10);
            no=(int) (no/10);

        }
        while (no>=0);

    }
}
