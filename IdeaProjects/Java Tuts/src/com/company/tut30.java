package com.company;

public class tut30 {
    static int mysum(int a, int b){
        int z;
        if(a>b){
            z=a+b;
        }
        else {
            z=(a+b)*5;
        }
        return z;
    }

    public static void main(String[] args) {
        int b=45;
        int n=46;
        int v;
        v= mysum(b,n);
        System.out.println(v);
    }
}
