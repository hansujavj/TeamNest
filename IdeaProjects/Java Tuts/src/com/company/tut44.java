package com.company;

//class Cylinder{
//    private int radius;
//    private int height;
//
//    public void setHeight(int Height){
//        height=Height;
//    }
//    public void setRadius(int Radius){
//        this.radius=Radius;
//    }
//    public int getHeight(){
//        return height;
//    }
//    public int getRadius(){
//        return radius;
//    }
//    public double getSurArea(){
//        return 2* Math.PI * radius * height + 2 * Math.PI * radius * radius;
//    }
//    public double getVolume(){
//        return Math.PI * radius * radius * height;
//    }
//
//    public Cylinder(int Height, int Radius){
//        this.radius=Radius;
//        this.height=Height;
//    }
//}


//class Rectangle{
//    private int length;
//    private int breadth;
//
//    public Rectangle(){
//        this.breadth=4;
//        this.length=5;
//    }
//    public Rectangle(int Length, int Breadth){
//        length=Length;
//        breadth=Breadth;
//    }
//    public float getPerimeter(){
//        return 2*length+2*breadth;
//    }
//    public float getArea(){
//        return length*breadth;
//    }
//}

class Sphere{
    private float radius;
    public Sphere(){
        radius=5;
    }
    public void setRadius(int Radius){
         radius=Radius;
    }
    public float getRadius(){
        return radius;
    }
    public double getArea(){
        return 4 * Math.PI * radius*radius;
    }
    public Sphere(int Radius){
        radius=Radius;
    }
}
public class tut44 {
    public static void main(String[] args) {

//    Cylinder MyCyl=new Cylinder(4,5);
//    MyCyl.setHeight(4);
//    MyCyl.setRadius(5);
//        System.out.println(MyCyl.getHeight());
//        System.out.println(MyCyl.getRadius());
//        System.out.println(MyCyl.getSurArea());
//        System.out.println(MyCyl.getVolume());

//        Rectangle ab=new Rectangle(4,4);
//        System.out.println(ab.getPerimeter());
//        System.out.println(ab.getArea());
//
//        Rectangle bh=new Rectangle();
//        System.out.println(bh.getPerimeter());


        Sphere bn=new Sphere();
//        bn.setRadius(6);
        System.out.println(bn.getArea());

        Sphere nm=new Sphere(4);
        System.out.println(nm.getArea());
    }

}
