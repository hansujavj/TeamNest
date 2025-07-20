package com.company;
import java.util.Scanner;

public class sum {
    static int bhi(){
        int sum=0;
        int [] vb={45,12,71,82,95};
        for(int i=0;i< vb.length;i++){
            sum=sum+vb[i];
        }
        return (sum);
    }

    public static void main(String[] args) {
        int b=bhi();
        System.out.println(b);
    }
}
