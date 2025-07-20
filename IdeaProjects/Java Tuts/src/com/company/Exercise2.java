package com.company;
import java.util.Scanner;
import java.util.Random;

public class Exercise2 {
    public static void main(String[] args) {

        Scanner fg=new Scanner(System.in);
        System.out.println("Choose between following " +
                "\n1 for rock" +
                "\n2 for Scissor" +
                "\n3 for Paper ");
        int inp= fg.nextInt();
        Random rd=new Random();
        int a=rd.nextInt(1,4);
        System.out.println(a);

        if(inp==1 && a==1){
            System.out.println("I chose rock, You chose rock so Tied");
        }
        else if(inp==1 && a==2){
            System.out.println("I chose Scissor, You chose rock so You won");
        }
        else if(inp==1 && a==3){
            System.out.println("I chose Paper, You chose rock so I won");
        }
        else if(inp==2 && a==1){
            System.out.println("I chose rock, You chose Scissor so I won");
        }
        else if(inp==2 && a==2){
            System.out.println("I chose Scissor, You chose Scissor so Tied");
        }
        else if(inp==2 && a==3){
            System.out.println("I chose Paper, You chose Scissor so You won");
        }
        else if(inp==3 && a==1){
            System.out.println("I chose rock, You chose Paper so You won");
        }
        else if(inp==3 && a==2){
            System.out.println("I chose Scissor, You chose Paper so I won");
        }
        else if(inp==3 && a==3){
            System.out.println("I chose Paper, You chose Paper so Tied");
        }

    }
}



