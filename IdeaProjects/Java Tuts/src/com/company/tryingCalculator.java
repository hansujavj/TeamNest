package com.company;

import java.util.Scanner;

class calculato {
    double division(double a, double b){
        if(b==0){
            try {
                throw new zeroDenominator();
            }
            catch (Exception e){
                System.out.println(e);
            }
        }
        return a/b;
    }
    void calculate(double a){
        boolean k=true;
        for(int i=0;i<20;i++){
            Scanner sc=new Scanner(System.in);
            String d=sc.nextLine();
            if (d.equals("=")){
                System.out.println(a);
                break;
            }
            double b=sc.nextDouble();
            if(d.equals("+")){
                a=a+b;
                System.out.println(a);
            }
            if (d.equals("-")) {
                a=a-b;
                System.out.println(a);
            }
            if (d.equals("*")) {
                a=a*b;
                System.out.println(a);
            }
            if(d.equals("/")){
                a=division(a,b);
                System.out.println(a);
            }

        }
    }
}
public class tryingCalculator {
    public static void main(String[] args) {
        calculato jk=new calculato();
        jk.calculate(4);
    }
}
