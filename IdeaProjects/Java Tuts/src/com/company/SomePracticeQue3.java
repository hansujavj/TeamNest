package com.company;

//Problem 1
//class fibonacci{
//    void fibonacci(int N){
//        long[] arr=new long[N*5];
//        arr[0]=0;
//        arr[1]=1;
//        for(int i=2;i<arr.length;i++){
//            arr[i]=arr[i-1]+arr[i-2];
//        }
//        long num=arr[N];
//        for(long i=0;i<2;i++){
//            System.out.println(num%10);
//            num=num/10;
//        }
//    }
//}

//Problem 2
//class noOfSquares{
//    int noOfSquares(int m, int n){
//        int ans=0;
//        for(int i=Math.min(m,n);i>0;i--){
//            ans=ans+m*n;
//            m--;
//            n--;
//        }
//        return ans;
//    }
//}

//Problem 3
//class weekDay{
//    String weeDay(int d, int m, int y){
//        long days=0;
//        String[]week={"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
//        for(int i=1;i<y;i++){
//            if(i%4==0){
//                days=days+366;
//            }
//            else {
//                days=days+365;
//            }
//        }
//        int[]month={31,28,31,30,31,30,31,31,30,31,30,31};
//        int[]monthL={31,29,31,30,31,30,31,31,30,31,30,31};
//        if(y%4==0) {
//            for (int i = 0; i < m - 1; i++) {
//                days = days + monthL[i];
//            }
//        }
//        else{
//            for (int i = 0; i < m - 1; i++) {
//                days = days + month[i];
//            }
//        }
//        days=days+d;
//        int weekD=(int)days%7;
//        if(weekD==0){
//            return week[6];
//        }
//        String day=week[weekD-1];
//        return day;
//    }
//}

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

//Problem 4 to perform operations on array like search, insert, delete (imp to understand arraylist)
//class  Arra{
//    ArrayList<Integer> arr=new ArrayList<>();
//    void Arra(char cha, int number){
//        if(cha=='i'){
//            arr.add(number);
//            System.out.println(arr);
//        }
//        if(cha=='d'){
//            for(int i=0;i< arr.size();i++){
//                if(arr.get(i)==number){
//                    arr.set(i,0);
//                }
//            }
//            System.out.println(arr);
//        }
//        if(cha=='s'){
//            System.out.println(arr.indexOf(number));
//        }
//    }
//}

//Problem 5
//class alternateNum{
//    ArrayList<Integer> arr=new ArrayList<>();
//    void alternateNum(){
//        for(int i=0;i<arr.size();i++){
//            System.out.println(arr.get(i));
//            i++;
//        }
//    }
//}

//Problem 6 to find second largest element of an array
//class secondLarge{
//    ArrayList<Integer>arr=new ArrayList<>();
//    int secondLarge(){
//        int max=0;
//        for(int i=0;i<arr.size();i++){
//            if(arr.get(i)>max){
//                max=arr.get(i);
//            }
//        }
//        int secondMax=0;
//        for(int i=0;i< arr.size();i++){
//            if (arr.get(i)<max && arr.get(i)>secondMax){
//                secondMax=arr.get(i);
//            }
//        }
//        return secondMax;
//    }
//}

//Problem 7
//class duplicate{
//    ArrayList<Integer>arr=new ArrayList<>();
//    void duplicate(){
//        Collections.sort(arr);
//        System.out.println(arr);//To sort an arraylist
//        for(int i=0;i<arr.size();i++){
//            for(int j=0;j<arr.size();j++){
//                if(arr.get(i)==arr.get(j) && i!=j){
//                    arr.set(j,0);
//                }
//            }
//        }
//        Collections.sort(arr);
//        System.out.println(arr);
//    }
//}


//Problem 8 to find disance between 2 numbers in array
//class distance{
//    ArrayList<Integer> array=new ArrayList<>();
//    void distance(int x, int y){
//        int first=0;
//        for(int i=0;i< array.size();i++){
//            if(array.get(i)==x) {
//                first = x;
//                break;
//            }
//            if(array.get(i)==y){
//                first=y;
//                break;
//            }
//        }
//        System.out.println(first);
//        int last=0;
//        for(int i= array.indexOf(first)+1;i< array.size();i++){
//            if(array.get(i)==x) {
//                last = x;
//                break;
//            }
//            if(array.get(i)==y){
//                last=y;
//                break;
//            }
//        }
//        System.out.println(last);
//        int FirstInd=array.indexOf(first);
//        int SecondInd=array.indexOf(last);
//        int distance= SecondInd-FirstInd;
//        System.out.println(distance);
//    }
//}


//Problem 9 to find if 3 numbers in accending order are in array
//class subsequence{
//    ArrayList<Integer>arr=new ArrayList<>();
//    void subsequence(){
//        int min=Collections.min(arr);
//        int max=Collections.max(arr);
//        int second=max;
//        for(int i=0;i<arr.size();i++){
//            if(arr.get(i)>min && arr.get(i)<second){
//                second=arr.get(i);
//            }
//        }
//        int third=max;
//        for(int i=0;i<arr.size();i++){
//            if(arr.get(i)>second && arr.get(i)<third){
//                third=arr.get(i);
//            }
//        }
//        System.out.println(min);
//        System.out.println(second);
//        System.out.println(third);
//    }
//}


//Problem 10 to print info of students (have used multidimensional arraylist)
//class marks{
//    String[][]Info=new String[50][3];
//    int nameInd=0;
//    void marks(String name, int marks, int age){
//        String Age=String.valueOf(age);
//        String Marks=String.valueOf(marks);
//        Info[nameInd][0]=name;
//        Info[nameInd][1]=Age;
//        Info[nameInd][2]=Marks;
//        nameInd++;
//    }
//    void printInfo() {
//        System.out.println(Arrays.deepToString(Info));  //to print multidimensional array
//    }
//}
//class mrks{   //using multidimensional arraylist
//    ArrayList<ArrayList<String>>Info=new ArrayList<ArrayList<String>>();
//    int nameInd=0;
//    void marks(String name, int marks, int age){
//        Info.add(nameInd,new ArrayList(Arrays.asList(name, age, marks)));
//        nameInd++;
//    }
//    void printInfo(){
//        System.out.println(Info);
//    }
//}

public class SomePracticeQue3 {
    public static void main(String[] args) {

        System.out.println(new BigDecimal(4).divide(new BigDecimal(12),3, RoundingMode.UP));  //

//        int[]mar={1,2,5,6};
//        System.out.println(Arrays.toString(mar));  //to print array in array format

//Problem 10 for arraylist
//        mrks lj=new mrks();
//        lj.marks("Anand Jambhale",50,21);
//        lj.marks("Vilas Jambhale",55,57);
//        lj.marks("Hansuja Jambhale",60,14);
//        lj.printInfo();
//for array
//        marks hj=new marks();
//        hj.marks("Anand Jambhale",50,21);
//        hj.marks("Vilas Jambhale",55,57);
//        hj.marks("Mamta Jambhale",55,39);
//        hj.marks("Hansuja Jambhale",60,14);
//        hj.printInfo();

//Problem 9
//        subsequence hj=new subsequence();
//        ArrayList<Integer>arg=new ArrayList<>(Arrays.asList(2,3,4,5,6,7));
//        hj.arr=arg;
//        hj.subsequence();

//Problem 8
//        distance hj=new distance();
//        ArrayList<Integer>arr=new ArrayList<>(Arrays.asList(1,2,3,2));
//        hj.array=arr;
//        hj.distance(1,2);
//        ArrayList<Integer>ar=new ArrayList<>(Arrays.asList(86,39,90,67,84,66,62));
//        hj.array=ar;
//        hj.distance(66,12);
//        ArrayList<Integer>arg=new ArrayList<>(Arrays.asList(86,39,90,67,84,66,62));
//        hj.array=arg;
//        hj.distance(66,86);

//Problem 7
//        duplicate gh=new duplicate();
//        ArrayList<Integer>arg=new ArrayList<>(Arrays.asList(2,5,7,4,6,1,2));
//        gh.arr=arg;
//        gh.duplicate();

//Problem 6
//        secondLarge gh=new secondLarge();
//        ArrayList<Integer>array=new ArrayList<>(Arrays.asList(1,2,3,4,5));
//        gh.arr=array;
//        System.out.println(gh.secondLarge());
//        ArrayList<Integer>arra=new ArrayList<>(Arrays.asList(12,35,1,10,34,1));
//        gh.arr=arra;
//        System.out.println(gh.secondLarge());
//        ArrayList<Integer>arry=new ArrayList<>(Arrays.asList(10,5,10));
//        gh.arr=arry;
//        System.out.println(gh.secondLarge());

//Problem 5
//        alternateNum gh=new alternateNum();
//        gh.arr=new ArrayList<>(Arrays.asList(1,2,3,4,5));
//        gh.alternateNum();
//        gh.arr=new ArrayList<>(Arrays.asList(1,2,3,4));
//        gh.alternateNum();

//Problem 4
//        Arra gh=new Arra();
//        ArrayList<Integer> arrj=new ArrayList<>(Arrays.asList(2,3,8,6));
//        gh.arr=arrj;
//        gh.Arra('i',2);
//        gh.Arra('d',2);
//        gh.Arra('s',8);


//Problem 3
//        weekDay gh=new weekDay();
//        System.out.println(gh.weeDay(30,8,2010));

//Problem 2
//        noOfSquares gh=new noOfSquares();
//        System.out.println(gh.noOfSquares(4,3));
//        System.out.println(gh.noOfSquares(4,3));
//        System.out.println(gh.noOfSquares(4,3));

//Problem 1
//        fibonacci gh=new fibonacci();
//        gh.fibonacci(255);
    }
}
