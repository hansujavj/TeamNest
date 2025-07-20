package com.company;

import java.util.Scanner;

public class tut81_specificExceptionHandling {
    public static void main(String[] args) {
        int[]arr=new int[5];
        arr[0]=1;
        arr[1]=5;
        arr[2]=6;
        arr[3]=56;
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the index of array");
        int a=sc.nextInt();
        System.out.println("ENter number u want to divide with ");
        int b=sc.nextInt();
        try {
            int c=arr[a]/b;
            System.out.println("Ans ins "+c);
        }

        catch (ArrayIndexOutOfBoundsException m){
            int c=arr[arr.length-1]/b;
            System.out.println("Index is out of bound so considering last index of array which is " + (arr.length-1));
            System.out.println(b);
        }
        catch (ArithmeticException n){
            System.out.println("can not divide with 0 so dividing by 1");
            int c=arr[a]/1;
            System.out.println(c);
        }
        catch (Exception e){
            System.out.println(e);
        }

    }
}
