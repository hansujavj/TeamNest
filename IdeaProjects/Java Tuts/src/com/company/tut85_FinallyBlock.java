package com.company;

import java.math.BigDecimal;
                                       //if u write code normally without finally then if exception not catches then finally wont execute
public class tut85_FinallyBlock {
    public static int greet(){
        try{
            int a=5;
            int b=2;
            int c=a/b;
            return c;
        }
        catch (Exception e){   //we can also not write catch bt write "try finally"
            System.out.println(e);
        }
        finally {             //if try catch not executed then also finally will execute  //it can only applied after try catch
            System.out.println("Executed");
        }
        return 0;
    }


    public static int gh(){
        try {
            for(int i=0;i<20;i++){
                return i;
            }
        }
        catch (Exception e){
            System.out.println(e);
        }
        finally {
            System.out.println("Hello");
        }
        return 20;
    }


    public static void main(String[] args) {
        greet();
        System.out.println("Hello");
        System.out.println(gh());
        BigDecimal m=BigDecimal.valueOf(4).divide(BigDecimal.valueOf(5));
        System.out.println(m);
    }
}
