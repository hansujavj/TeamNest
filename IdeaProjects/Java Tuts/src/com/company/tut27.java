package com.company;
import java.util.Scanner;

public class tut27 {
    public static void main(String[] args) {
        String[]gh= {"Hi","Hello","Bye"};
        System.out.println(gh.length);


        for (int i= gh.length-1;i>=0;i--){
            System.out.println(gh[i]);

        for(String element:gh){     //for each loop
            System.out.println(element);
        }
        }
    }
}
