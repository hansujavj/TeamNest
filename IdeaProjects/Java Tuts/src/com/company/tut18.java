package com.company;
import java.util.Scanner;

public class tut18 {
    public static void main(String[] args) {

        Scanner sg = new Scanner(System.in);
        int age = sg.nextInt();
        if (age > 56) {
            System.out.println("You are experienced");
        } else if (age > 46) {
            System.out.println("you are semi experienced");
        } else {
            System.out.println("You are not experienced");
        }
        switch (age){
            case 18-> {
                System.out.println("You are being adult");
            }
            case 22-> {
                System.out.println("You are going to get a job");
            }
            case 60-> {
                System.out.println("You are going to get retired");
            }
            default-> {
                System.out.println("Enjoy your life");
            }

            //you can also do
            /*
            case 20:
            System.out.println("Hiijvjh)
            break;
             */
        }
    }
}
