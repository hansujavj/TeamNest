package com.company;


class invalidOperation extends Exception{
    public String toString(){
        return super.toString()+" Enter valid operation to do";
    }
}
class zeroDenominator extends Exception{
    public String toString(){
        return super.toString()+" Denominator cant be zero";
    }
}
class maxInput extends  Exception{
    public String toString(){
        return super.toString()+" max input limit is 100000";
    }
}
class notMultiplicable extends  Exception{
    public String toString(){
        return super.toString()+" should not be greater than 7000";
    }
}
class calculator{
    double addition(double a, double b){
        return a+b;
    }
    double substraction(double a, double b){
        return a-b;
    }
    double multiplication(double a, double b){
        try {
            if(a>7000 || b>7000) {
                throw new notMultiplicable();
            }
            else {
                return a*b;
            }
        }
        catch (Exception e){
            System.out.println(e);
        }
        return -1;
    }
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
    double calculato(double a, double b, String c){
        if(c!="+" && c!="-" && c!="/" && c!="*"){
            try {
                throw new invalidOperation();
            }
            catch (Exception e){
                System.out.println(e);
            }
        }

        try {
            if(a>100000 || b>100000){
                throw new maxInput();
            }
            if(c=="+"){
                return addition(a,b);
            }
            if(c=="-"){
                return substraction(a,b);
            }
            if(c=="*"){
                return multiplication(a,b);
            }
            if(c=="/"){
                return division(a,b);
            }
        }
        catch (Exception e){
            System.out.println(e);
        }

        return -1;
    }
}
public class Exercise6 {
    public static void main(String[] args) {
        calculator hj=new calculator();
        System.out.println(hj.calculato(7,2,"/"));
        System.out.println(hj.calculato(5,2,"-"));
        System.out.println(hj.calculato(5,2,"+"));
        System.out.println(hj.calculato(5,2,"h"));
        System.out.println(hj.calculato(5,70000,"*"));
        System.out.println(hj.calculato(5,170000,"+"));
    }
}
