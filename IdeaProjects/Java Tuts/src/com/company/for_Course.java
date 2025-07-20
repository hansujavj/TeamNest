package com.company;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class map{
    String str="Hello I am Anand Jambhale";
    Map<Character,Integer> occurences=new HashMap<>();
    char[]characters= str.toCharArray();
    void implementation(){
        for(char character:characters){
            Integer integer=occurences.get(character);
            System.out.println(integer);
            if(integer==null){
                occurences.put(character,1);
            }else{
                occurences.put(character,integer+1);
            }
        }
        System.out.println(occurences);
    }

    void StringOccurences(){
        String[]words=str.split(" ");  //to collect all elements of str separated by " " in words array
        System.out.println(Arrays.toString(words));
        Map<String,Integer>stringOccurences=new HashMap<>();
        for(int i=0;i<words.length;i++){
            Integer integer=stringOccurences.get(words);
            System.out.println(integer);
            if(integer==null){
                stringOccurences.put(words[i],1);    //to add element in map we use "put" keyword
            }
            else{
                stringOccurences.put(words[i],integer+1);
            }
        }
        System.out.println(stringOccurences);
    }
}


//public class accept<T extends Number>{
//    ArrayList<T>list=new ArrayList<>();
//    accept(){
//
//    }
//    public <T extends Number> void duplicate(T value){
//
//    }
//}
public class for_Course {
    public static void main(String[] args) {

        map gh=new map();
        gh.implementation();
        gh.StringOccurences();
//
//        String[]days={"Sunday","Monday","Turesday","Wednesday","Thursday","Friday","Saturday"};
//        String max="";
//        for(int i=0;i< days.length;i++){
//            if(days[i].length()>max.length()){
//                max=days[i];
//            }
//        }
//        System.out.println(max);
    }
}
