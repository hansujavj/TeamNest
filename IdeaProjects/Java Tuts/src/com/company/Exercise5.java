package com.company;

import java.util.Map;

interface calculate{
    double area();
    double perimeter();
    double surfaceArea();
}

class rectangle implements calculate{
    int length;
    int breadth;
    rectangle(int Length, int Breadth){
        length=Length;
        breadth=Breadth;
    }
    public double area(){
        return length*breadth;
    }
    public double perimeter(){
        return length+breadth;
    }
    public double surfaceArea(){
        return length+breadth;
    }
}

class square implements calculate{
    int length;
    square(int side){
        length=side;
    }
    public double area(){
        return length*length;
    }
    public double perimeter(){
        return length*4;
    }
    public double surfaceArea(){
        return length*4;
    }
}

class circle implements calculate{
    int radius;
    circle(int Radius){
        radius=Radius;
    }
    public double area(){
        return Math.PI*radius*radius;
    }
    public double perimeter(){
        return 2*Math.PI*radius;
    }
    public double surfaceArea(){
        return  2*Math.PI*radius;
    }
}

public class Exercise5 {
    public static void main(String[] args) {
        circle hj=new circle(5);
        System.out.println(hj.area());

        square j=new square(2);
        System.out.println(j.area());
    }
}
