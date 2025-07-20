package com.company;

interface cycle{
    int a=45;
    void applyBrake(int decrement);
    void speedup(int increment);
}

class avonCycle implements cycle {
    void blowHorn() {
        System.out.println("Peee pooo");
    }

    public void applyBrake(int decrement) {
        System.out.println("applying brake");
    }

    public void speedup(int increment) {
        System.out.println("Speeding up");
    }
}

public class tut55_interfaces {
    public static void main(String[] args) {
        avonCycle bn=new avonCycle();
        bn.applyBrake(1);
    }
}
