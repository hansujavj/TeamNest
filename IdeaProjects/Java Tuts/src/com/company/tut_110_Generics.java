package com.company;

import java.util.ArrayList;

class Generics<T1,T2>{
    int val=354;
    private T1 t1;
    private T2 t2;

    public Generics(int val,  T1 t1, T2 t2){
        this.val=val;
        this.t1=t1;
        this.t2=t2;
    }

    public int getVal() {
        return val;
    }

    public void setVal(int val) {
        this.val = val;
    }

    public T1 getT1() {
        return t1;
    }

    public void setT1(T1 t1) {
        this.t1 = t1;
    }
    public T2 getT2(){
        return t2;
    }
}

public class tut_110_Generics {
    public static void main(String[] args) {
        ArrayList arrayList=new ArrayList();
        arrayList.add("Stri");
        arrayList.add(54);
        arrayList.add(5.0);
        int a=(int) arrayList.get(1);
        System.out.println(a);


        Generics g1=new Generics(23,"Mystring","Hello");  //as T2 is defined so i can give anything in t2 wheather a float, int,string
        int str=g1.getVal();
        System.out.println(str);
        System.out.println(g1.getT1());
        System.out.println(g1.getT2());
    }
}
