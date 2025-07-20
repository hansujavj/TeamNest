package com.company;
import java.util.Scanner;

public class reverse {
    public static void main(String[] args) {
        Scanner bh=new Scanner(System.in);
        String gh=bh.nextLine();
        String revers="";
        for(int i=gh.length() - 1;i>=0;i--){
            revers=revers+gh.charAt(i);
        }
        System.out.print(revers);
    }
}
