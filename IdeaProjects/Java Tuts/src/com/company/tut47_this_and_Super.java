package com.company;

class clas{
    int a;
    public clas(int a){
        this.a=a;     //this is mainly used when u are having similar names like here a
    }
    public int getA(){
        return a;
    }
}

class doclass extends clas{
    public doclass(){
        super(1);    //even when default constructor was not there so super helps to invoke consructor having an argument
        System.out.println("Hello");
    }

}

public class tut47_this_and_Super {
    public static void main(String[] args) {

        clas v=new clas(4);
        System.out.println(v.getA());
    }
}
