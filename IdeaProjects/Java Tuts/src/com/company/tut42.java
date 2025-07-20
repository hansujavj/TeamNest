package com.company;

class MyEmployee{
    private String name;
    private int id;

    public void getName(){
        System.out.println(name);
    }
    public void getId(){
        System.out.println(id);
    }
    public void setName(String Name){
        name=Name;
    }
    public void setId(int Id){
        id=Id;
    }
//    public MyEmployee(){
//        id=54;
//        name="Vilas";
//    }
    public MyEmployee(String Name, int Id){
        id=Id;
        name=Name;
    }
}

public class tut42 {
    public static void main(String[] args) {
//        MyEmployee Anand=new MyEmployee();
//        Anand.setName("Harry");
//        Anand.getName();

        MyEmployee Harry=new MyEmployee("Harry",45);
        Harry.getName();
    }
}
