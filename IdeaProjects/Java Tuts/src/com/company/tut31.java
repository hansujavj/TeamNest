package com.company;

public class tut31 {
    static int logic(int a,int b){
        int c;
        if(a>b){
            c=a+b;
        }
        else{
            c=(a+b)*5;
        }
        return c;
    }

    static void change(int [] arr){
        arr[0]= 56;
        System.out.println("First element of array is "+arr[0]);
    }

    public static void main(String[] args) {
//        int v=logic(5,6);
//        System.out.println(v);


        int[]marks={45,52,56,85,75};
        change(marks);
    }
}
