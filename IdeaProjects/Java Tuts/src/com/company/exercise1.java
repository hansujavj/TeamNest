package com.company;
import java.util.Scanner;

public class exercise1 {
    public static void main(String[] args) {
    Scanner fg=new Scanner(System.in);
    System.out.println("write as 'your marks outoff'");
    System.out.print("Your marks in English:");
    float Eng=fg.nextByte();
    float EngO=fg.nextByte();
    float EngP=Eng*100/EngO;

    System.out.print("Your marks in Marathi:");
    float Mar=fg.nextByte();
    float MarO=fg.nextByte();
    float MarP=Mar*100/MarO;

    System.out.print("Your marks in Maths:");
    float Mat=fg.nextByte();
    float MatO=fg.nextByte();
    float MatP=Mat*100/MatO;

    System.out.print("Your marks in Geography:");
    float Geo=fg.nextByte();
    float GeoO=fg.nextByte();
    float GeoP=Geo*100/GeoO;

    System.out.print("Your marks in History:");
    float His=fg.nextByte();
    float HisO=fg.nextByte();
    float HisP=His*100/HisO;

    float TotalP=(EngP+MarP+MatP+GeoP+HisP)/5;
    System.out.print("Your Percentage are:");
    System.out.println(TotalP);

    }
}
