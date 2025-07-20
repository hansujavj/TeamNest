package com.company;

import java.util.Arrays;

public class tut29 {
    public static void main(String[] args) {

        //Problem 1 to find sum of elements
//        float[]a={21.0f,56.5f,65.5f,58.2f,45.7f};
//        float sum=0f;
//        for (int i=0;i< a.length;i++){
//            sum=sum+a[i];
//        }
//        System.out.println(sum);


        //Problem 2 to find wheather given number is in array or not
//        int a=7;
//        int []b={56,8,7,6,1,2,5,8,7};
//        boolean v=false;
//        for(int i=0;i< b.length;i++){
//            if (b[i]==a) {
//                v = true;
//                break;
//            }
//        }
//        if (v==true) {
//            System.out.println("Given number is in array");
//        }
//        else if (v==false){System.out.println("Not in array");}


        //Problem 3 average of array
//        float[]a={45.6f,45.2f,60f,40f};
//        float sum=0;
//        for (float elmt:a){
//            sum = sum +elmt;
//        }
//        System.out.println(sum/ (a.length));


        //Problem 4 add 2 matrix
//        int [][]a={{1,2,3},
//                   {5,6,7}};
//        int [][]b={{4,8,7},
//                   {4,7,9}};
//        int [][]res={{0,0,0},{0,0,0}};
//        for (int i=0;i< a.length;i++){
//            for (int j=0;j< a[i].length;j++){
//                res[i][j]=a[i][j]+b[i][j];
//            }
//        }
//        for (int n=0;n< a.length;n++){
//            for (int m=0;m< a[n].length;m++) {
//                System.out.print(res[n][m]+"\t");
//            }
//            System.out.println("\n");
//        }






        //Problem 5 reverese an array
        //one way
//        int[]a={-5,-9,-8,-6,-89,-45};
//        for(int i = (a.length-1);i>=0;i--){
//            System.out.print(a[i]);
//            System.out.print("\t");
//        }



        //second way
//        int[]a={-5,-9,-8,-6,-89,-45};
//        int l= a.length;
//        int[]b=new int[a.length];
//        for (int i=(a.length-1);i>=0;i--){
//            b[l-i-1]=a[i];
//        }
//        for(int eme:b){
//            System.out.println(eme);
//        }


        //Problem 6 to find max number
//        int[]a={-5,-9,-8,-6,-89,-45};
//        long b=Integer.MIN_VALUE;
//        for (int i=0;i< a.length;i++){
//            if (a[i]>b){
//                b=a[i];
//            }
//        }
//        System.out.println(b);


        //Problem 7 to find minimum
//        int[]a={-5,-9,-8,-6,-89,-45};
//        long min=Integer.MAX_VALUE;
//        for (int i=0;i< a.length;i++){
//            if (a[i]<min){
//                min=a[i];
//            }
//        }
//        System.out.println(min);


//        int[]a={45,9,8,6,89,45};
//        int[]b=a;
//
//        System.out.println(b[1]);
//        System.out.println(a[1]);
//        for (int i=0;i< a.length;i++) {
//            if (a[i]==b[i]){
//                System.out.println("Array is sorted");
//            }
//            else{
//                System.out.println("Array is not sorted");
//            }
//        }


        int[]a={45,9,8,6,89,45};
        for(int i=0;i< a.length;i++){
            for (int j=0;j< a.length;j++){
                int h=0;
                if (a[i]>h){
                    System.out.println(a);
                }
            }
        }






    }
}
