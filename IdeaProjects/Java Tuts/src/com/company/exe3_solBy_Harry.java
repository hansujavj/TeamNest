package com.company;
import java.util.Random;
import java.util.Scanner;

class Gam{
    int inpByUser;
    public int setInpByUser(int a){
        inpByUser=a;
        return inpByUser;
    }
    public int setPcInp(){
        Random bn=new Random();
        int pcInp=bn.nextInt(100);
        return pcInp;
    }
}

public class exe3_solBy_Harry {
    public static void main(String[] args) {

        Gam bm=new Gam();
        int PcInp=bm.setPcInp();
        System.out.println("Guess the number");
        for(int i=0;i<100;i++){
            Scanner nj=new Scanner(System.in);
            int inpByUser = bm.setInpByUser(nj.nextInt());
            if(inpByUser==PcInp){
                System.out.println("You guessed it right the number was "+PcInp);
                break;
            }
            else if(inpByUser<PcInp){
                System.out.println("You are going low");
            }
            else if(inpByUser>PcInp){
                System.out.println("You are going high");
            }
            else {
                System.out.println("Guess again");
            }
        }
    }
}
