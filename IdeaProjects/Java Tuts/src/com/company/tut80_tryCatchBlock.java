package com.company;

public class tut80_tryCatchBlock {
    public static void main(String[] args) {
        int a=500;
        int b=0;
        try {      //without try catch if problem occured in calculation c then futher program wont execute
            int c=a/b;
            System.out.println(c);
        }
        catch (Exception e){
            System.out.println("Error occured");
            System.out.println(e);
        }

        System.out.println("Program executed");
    }
}
