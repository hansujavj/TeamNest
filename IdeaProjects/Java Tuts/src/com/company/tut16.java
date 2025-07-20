package com.company;
import java.util.Scanner;

public class tut16 {
    public static void main(String[] args) {

        Scanner sg=new Scanner(System.in);
        int input=sg.nextInt();
        if (input<=18) {
            System.out.println("You are allowed");
        }

        else{
                System.out.println("You are not allowed");
            }

    }
}
