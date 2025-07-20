package com.company;

import java.util.Locale;

public class tut14 {
    public static void main(String[] args) {
        String name="hi how are you";
        System.out.println(name.length());
        System.out.println(name.toUpperCase());


        String nnn="     Anand   Vilas Jambhale";
        System.out.println(nnn.trim());
        System.out.println(nnn.substring(2,8));   //Strarting from 2 AND 8 IS NOT INCLUDED

        System.out.println(nnn.replace('a','r'));      //replacement
        System.out.println(nnn.replace("and","rnf"));
        System.out.println(nnn.replace("a","rnf"));

        System.out.println(nnn.startsWith("Ana"));     //wheather start or not
        System.out.println(nnn.endsWith("   "));

        System.out.println(nnn.charAt(8));    //char at index 8
        System.out.println(nnn.indexOf("a"));
        System.out.println(nnn.indexOf("Ana"));
        System.out.println(nnn.indexOf("a",10));
        System.out.println(nnn.indexOf("o"));   //not having this char so showing -1


        System.out.println(nnn.lastIndexOf("a"));
        System.out.println(nnn.lastIndexOf("a",10));

        System.out.println(nnn.equals("Anand"));   //wheather equal or not
        System.out.println(nnn.equalsIgnoreCase("Anan"));  //doesnt conider any upper or lower case( A or a)


        System.out.println("I am \"Anand Jambhale\"");
        System.out.println("Hi how / are u");  //  \n for new line, \t for tab

    }

}
