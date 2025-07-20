package com.company;
//Problem 1
//class circle{
//    int radius;
//    public circle(int Radius){
//        radius=Radius;
//    }
//    public void setRadius(int a){
//        radius=a;
//    }
//    public double getCirArea(){
//        return Math.PI*radius*radius;
//    }
//    public double getCirPerimeter(){
//        return 2*Math.PI*radius;
//    }
//}
//
//class cylinder extends circle{
//    int height;
//    public cylinder(int Radius,int Height){
//        super(Radius);
//        height=Height;
//    }
//    public void setHeight(int a){
//        height=a;
//    }
//    public double getCylVolume(){
//        System.out.print("Volume of cylinder is ");
//        return getCirArea()*height;
//    }
//    public double getCylArea(){
//        System.out.print("Area of cylinder is ");
//        return getCirPerimeter()*height + getCirPerimeter()*radius;
//    }
//}

//Problem 2
class Rectangle{
    int length;
    int breadth;
    public Rectangle(int Length,int Breadth){
        length=Length;
        breadth=Breadth;
    }
    public double getRecArea(){
        return length*breadth;
    }
}
class Cuboid extends Rectangle{
    int height;
    public Cuboid(int Length,int Breadth, int Height){
        super(Length,Breadth);
        height=Height;
    }
    public double getCuboArea(){
        return 2*getRecArea()+2*length*height+2*breadth*height;
    }
    public double getCuboVol(){
        return getRecArea()*height;
    }
}

public class tut52_praciceQue {
    public static void main(String[] args) {
        //Problem 1
//        cylinder b=new cylinder(5,5);
//        b.setRadius(5);
//        b.setHeight(5);
//        System.out.println(b.getCylVolume());
//        System.out.println(b.getCylArea());

        //Problem 2
        Rectangle bn=new Rectangle(4,5);
        Cuboid vb=new Cuboid(bn.length, bn.breadth,5);
        System.out.println(vb.getRecArea());
        System.out.println(vb.getCuboArea());
        System.out.println(vb.getCuboVol());

    }
}
