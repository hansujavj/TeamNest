package com.company;

import java.util.Scanner;
import java.util.Random;

class Game{
    public static void Guess(){
    Random Ra = new Random();
    int b= Ra.nextInt(0,100);
        System.out.println("Guess the number");

        Scanner gh=new Scanner(System.in);

        for (int i=0;i<=100;i++){
            int d= gh.nextInt();
            if (b!=d&&((b-d<=10)||(b-d<=(-10)))){
                System.out.println("You are close");
            }
            else if(d==b){
                System.out.println("You guessed it right the number was "+d);
                break;
            }
            else{
                System.out.println("Guess again");
            }
        }

    }
}
public class Exercise3 {
    public static void main(String[] args) {
        Game.Guess();
    }
}
