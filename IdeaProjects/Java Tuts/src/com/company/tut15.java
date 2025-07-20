package com.company;

public class tut15 {
    public static void main(String[] args) {
        String name="Anand Vilas Jambhale";
        String Name=name.toLowerCase();
        System.out.println(Name);
        String nme=name.replace(" ","_");
        System.out.println(nme);

        String letter="\"Dear <|name|>, means a lot\"";
        String lttr=letter.replace("<|name|>","some name");
        System.out.println(lttr);

        String str="Hi   How are you  ";
        System.out.println(str.indexOf("  "));
        System.out.println(str.indexOf("   "));

        System.out.println("Dear Anand\n\t how are you?\n\t how is your family?");
    }
}
