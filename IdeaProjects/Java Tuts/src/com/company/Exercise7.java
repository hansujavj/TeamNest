package com.company;

import java.util.Scanner;
import java.util.ArrayList;
import java.util.Arrays;


class librar{
    ArrayList<ArrayList> Books=new ArrayList<ArrayList>();
    int TotalBooks=0;
    ArrayList<ArrayList>Users=new ArrayList<ArrayList>();
    int USERS=0;
    void addUser(String UserName, String Password){
        Users.add(USERS,new ArrayList(Arrays.asList(UserName,Password)));
    }
    void User(){
        Scanner sc=new Scanner(System.in);
        System.out.println("Type your LoginId");
        String Id=sc.nextLine();
        System.out.println("Type your Password");
        String password=sc.nextLine();
        for(int k=0;k< Users.size();k++){
            if(Users.get(k).get(0).equals(Id) && Users.get(k).get(1).equals(password)){
                System.out.println("What you want to do?\n" +
                        "issueBook\n" +
                        "returnBook");
                String inp=sc.nextLine();
                if(inp.equals("issueBook")){
                    System.out.println("Which book you want to issue?");
                    String BookName=sc.nextLine();
                    System.out.println("How many books you want to issue?");
                    int no=sc.nextInt();
                    boolean found=false;
                    for(int i=0;i<Books.size();i++){
                        if(Books.get(i).get(0).equals(BookName)){
                            found=true;
                            int j=(int) Books.get(i).get(1);
                            if(j>no){
                                int reduce=j-no;
                                Books.remove(i);
                                Books.add(i, new ArrayList(Arrays.asList(BookName,reduce)));
                                System.out.println("Book issued to "+Id);
                                break;
                            }
                            if(no>j){
                                System.out.println("Don't have this much books, available books of "+BookName+" are "+j);
                            }
                        }
                    }
                    if(!found){
                        System.out.println("Sorry, we don't have this book");
                    }
                }
                if(inp.equals("returnBook")) {
                    System.out.println("Which book you want to return?");
                    String BookName=sc.nextLine();
                    System.out.println("How many books you are returning?");
                    int no=sc.nextInt();
                    if (Books.toString().contains(BookName)) {
                        for (int i = 0; i < Books.size(); i++) {
                            if (Books.get(i).get(0).equals(BookName)) {
                                int j = (int) Books.get(i).get(1);
                                int sum = j + no;
                                Books.remove(i);
                                Books.add(i, new ArrayList(Arrays.asList(BookName, sum)));
                                System.out.println(no+" book  of "+BookName+" has been returned");
                                break;
                            }
                        }
                    }
                    else{
                        System.out.println("We didn't have this book");
                    }
                }
            }
        }
    }

    void addBook(String BookName,int no){
        if(Books.toString().contains(BookName)){
            for (int i=0;i<Books.size();i++) {
                if (Books.get(i).get(0)==BookName) {
                    int j=(int) Books.get(i).get(1);
                    int o=Books.indexOf(BookName);
                    int sum=j+no;
                    Books.remove(i);
                    Books.add(i, new ArrayList(Arrays.asList(BookName,sum)));
                    break;
                }
            }
        }
        if(!Books.toString().contains(BookName)){
            Books.add(TotalBooks, new ArrayList(Arrays.asList(BookName,no)));
            TotalBooks++;
        }
    }
//    void issueBook(String BookName, int no){
//        for(int i=0;i<Books.size();i++){
//            if(Books.get(i).get(0)==BookName){
//                int j=(int) Books.get(i).get(1);
//                if(j>no){
//                    int reduce=j-no;
//                    Books.remove(i);
//                    Books.add(i, new ArrayList(Arrays.asList(BookName,reduce)));
//                    break;
//                }
//                if(no>j){
//                    System.out.println("Don't have this much books, available books of "+BookName+" are "+j);
//                }
//            }
//        }
//    }
//    void returnBook(String BookName, int no){
//        if(Books.toString().contains(BookName)){
//            for (int i=0;i<Books.size();i++) {
//                if (Books.get(i).get(0)==BookName) {
//                    int j=(int) Books.get(i).get(1);
//                    int o=Books.indexOf(BookName);
//                    int sum=j+no;
//                    Books.remove(i);
//                    Books.add(i, new ArrayList(Arrays.asList(BookName,sum)));
//                    break;
//                }
//            }
//        }
//        if(!Books.toString().contains(BookName)){
//            System.out.println("This book wasn't in the library");
//        }
//    }
    void showBooks(){
        System.out.println(Books);
    }
}

public class Exercise7 {
    public static void main(String[] args) {
        librar gh=new librar();
        gh.addBook("Anand",5);
        gh.addBook("Mamta",5);
        gh.addBook("Mamta",5);
        gh.addBook("Vilas",5);
        gh.addBook("Anand",5);


        gh.addUser("Anand", "anand");
        gh.addUser("Annd", "ana");
        gh.addUser("dfnd", "arfga");
        gh.User();
        gh.showBooks();

    }
}
