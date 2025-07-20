package com.company;


class Library{
    String [] books=new String[100];
    int availBook=0;
    public void addBook(String book){
        books[availBook]=book;
        availBook=availBook+1;
        System.out.println(book+" has been aded");
    }
    public void issueBook(String book){
        for(int i=0;i<=availBook;i++){
            if(books[i]==book){
                System.out.println(book+" has been issued");
                books[i]=null;
                availBook=availBook-1;
                break;
            }
//            System.out.println("This book is not in library");
        }

    }
    public void returnBook(String book){
//        books[]
    }
    public void showAvailBook(){
        System.out.println("Available books are:");
        for(int i=0;i<=availBook;i++){
            if(books[i]==null){
                continue;
            }
            System.out.println(books[i]);
        }
    }
}

public class exercise4 {
    public static void main(String[] args) {

        Library gh=new Library();
        gh.addBook("Hello");
        gh.addBook("Hoopds");
        gh.addBook("bhhbj");
        gh.addBook("bhhb");
        gh.showAvailBook();
        gh.issueBook("Hello");

        gh.issueBook("jhdbc");
        gh.issueBook("hjb hj");
        gh.showAvailBook();
        gh.issueBook("Hello");

    }
}
