package com.company;
import java.util.Scanner;

//Problem 1  emptying an array
//class empty{
//    public int[] emptyArr(int...arr){
//        for(int i=0;i< arr.length;i++){
//            arr[i]=arr[i]-arr[i];
//        }
//        for (int i=0;i< arr.length;i++){
//            System.out.println(arr[i]);
//        }
//        return arr;
//    }
//}

//Problem 2  reversing an String
//class reversing {
//    public String reverse(String toReverse) {
//
//        String reversed = "";
//        for (int i = 0; i < toReverse.length(); i++) {
//            reversed = toReverse.charAt(i) + reversed;
//        }
//        return reversed;
//    }
//}

//Problem 3  wheather given element is in array
//class inArray{
//    int[]Array={};
//    public void InArray(int integer){
//        boolean isIn=false;
//        for(int i=0;i< Array.length;i++){
//            if (integer==Array[i]){
//                isIn=true;
//            }
//        }
//        if(isIn==false){
//            System.out.println("Given int is not in array");
//        }
//        else {
//            System.out.println("Given int is in array");
//        }
//    }
//}

//Problem 4  to find if given no is int
//class IntCheck{
//    public  boolean isInt(double a){
//        boolean isint=false;
//        if(a%1==0){
//            isint=true;
//        }
//        return isint;
//    }
//}

//Problem 5  to find sum of elements in array
//class add{
//    public int AddElm(int...array){
//        int sum=0;
//        for(int i=0;i< array.length;i++){
//            sum=sum+array[i];
//        }
//        return sum;
//    }
//}

//Problem 6  if number 1 is divisible by another
//class divisible{
//    public boolean isDivisible(double a, double b){
//        double v=a/b;
//        boolean n=false;
//        if(v%1==0){
//            n=true;
//        }
//        return n;
//    }
//}

//Problem 7  to find age
//class  date{
//    int day;
//    int month;
//    int year;
//    public void todayDate(int day,int month,int year){
//        this.day=day;
//        this.month=month;
//        this.year=year;
//    }
//}
//class age extends date{
//    public void BirthDate(int Day,int Month,int Year){
//        int age=year-Year;
//        if (Month>month){
//            age=age-1;
//        }
//        if(month==Month && day<Day){
//            age=age-1;
//        }
//        System.out.println("Age is "+age);
//    }
//}

//Problem 8
//class hailstone{
//    public  void Hailstone(int a){
//        System.out.println(a);
//        for(int i=0;i<10;i++) {
//            if (a % 2 == 0) {
//                a = a / 2;
//                System.out.println(a);
//            } else {
//                a = 3 * a + 1;
//                System.out.println(a);
//            }
//        }
//    }
//}


//Problem 9
//class odd{
//    public void oddSeries(int a, int b){
//        int n=a;
//        int j=0;
//        int[] array=new int[(b-a)/2];
//        for (int i=0;n<=b-2;i++){
//            if (n%2==0){
//                n=n+1;
//                array[j]=n;
//                j=j+1;
//            }
//            else {
//                n=n+2;
//                array[j]=n;
//                j=j+1;
//            }
//        }
//        for(int i=0;i<array.length;i++){
//            System.out.println(array[i]);
//        }
//    }
//}


//Problem 10  to find if number is prime
class Prime{
    public void isPrime(int a){
        boolean IsPrime=true;
        for(int i=2;i<a;i++){
            if(a%i==0 && a!=i){
                IsPrime=false;
            }
        }
        if(IsPrime==false){
            System.out.println(a+" is not a Prime number");
        }
        else {
            System.out.println(a+" is a Prime number");
        }
    }
}

//Problem 11  to find sum of prime numbers upto b
//class sumP{
//    public boolean isPrime(int a) {
//        boolean IsPrime = true;
//        for (int i = 2; i <= 10; i++) {
//            if (a % i == 0 && a != i) {
//                IsPrime = false;
//            }
//        }
//        return IsPrime;
//    }
//    public int SumOfPrimeUpto(int b){
//        int sum=0;
//        for (int i=2;i<=b;i++){
//            if(isPrime(i)==true){
//                sum=sum+i;
//            }
//        }
//        return sum;
//    }
//}

//Problem 13
//class sorted{
//    public void sortedA(int...arr){
//        for(int i=0;i<100;i++){
//            if(i==)
//        }
//    }
//}

//Problem 14 Angstrong number
//class angstrong{
//    void angstrong(int number){
//        int no=number;
//        int num=number;
//        double powSum=0;
//        int digits=0;
//        for (int j=0;num>0;j++){
//            digits++;
//            num=num/10;
//        }
//        for (int i=0;no>0;i++){
//            powSum=powSum+Math.pow(no%10,digits);
//            no=no/10;
//        }
//        if(powSum==number){
//            System.out.println("Number is an angstrong");
//        }
//        else {
//            System.out.println("Number is not an angstrong");
//        }
//    }
//}


//Problem 15 to find pair of prime numbers whose multiplication will be given number
//class pairsOfPrime{
//    int [] PrimeNo=new int[100];
//    boolean isPrime=true;
//    int place=0;
//    void primeNumbers(){
//        for (int i=1;i<=200;i++){
//            for (int j=2;j<20;j++){
//                if (i%j==0 && i!=j){
//                    isPrime=false;
//                    continue;
//                }
//            }
//            if(isPrime==true){
//                PrimeNo[place]=i;
//                place++;
//            }
//            isPrime=true;
//        }
//    }
////    void printPrimeNo(){
////        primeNumbers();
////        for(int i=0;i<PrimeNo.length;i++){
////            System.out.println(PrimeNo[i]);
////        }
////    }
//
//    void pairsOfPrime(int number){
//        primeNumbers();
//        boolean pairsFound=false;
//        for(int j=0;j<PrimeNo.length;j++){
//            for (int i=0;i<PrimeNo.length;i++){
//                if(PrimeNo[i]*PrimeNo[j]==number && PrimeNo[i]!=0 && PrimeNo[j]!=0){  //PrimeNo[i]!=0 this condition is applied because empty elements in array stands 0 and
//                                                                                        //PrimeNo array is stated as 100 bt actual elements in that are 47, others are 0
//                    pairsFound=true;
//                    System.out.printf("pair found it is %d*%d=%d",PrimeNo[i],PrimeNo[j],PrimeNo[i]*PrimeNo[j]);
//                }
//            }
//        }
//        if(pairsFound==false) {
//            System.out.println("No pairs found");
//        }
//    }
//}


//Problem 16
//class  pattern{
////    void pattern(int number) {
////        for (int i = number; i >0 ; i--){
////            for(int j=i;j>0;j--){
////                for(int k=j;k>0;k--){
////                    System.out.print(j);
////                }
////            }
////            System.out.println();
////        }
////    }
//    void patter(int number) {
//        for (int i = number; i >0 ; i--){
//            for(int j=number;j>0;j--){
//                for(int k=i;k>0;k--){
//                    System.out.print(j);
//                }
//            }
//            System.out.println();
//        }
//    }
//}

//Problem 17  to find nth term of AP
//class AP{
//    void findTerm(int a1, int a2, int n){
//        int difference = a2-a1;
//        int[] AP=new int[n];
//        int term=0;
//        int nth=a1;
//        for(int i=0;i<n;i++){
//            AP[i]=nth;
//            nth=nth+difference;
//        }
//        System.out.println(AP[n-1]);
//    }
//}

//Problem 18 to find nth term of GP
//class GP{
//    void findNth(int a1, int ratio, int n){
//        int nth=a1;
//        int[]GP=new int[n];
//        int place=0;
//        for(int i=0;i<n;i++){
//            GP[place]=nth;
//            nth=nth*ratio;
//            place++;
//        }
//        System.out.println(n+"th term of GP is "+GP[n-1]);
//    }
//}

//Problem 19 to find nearest number to n which is divisible by m
//class find{
//    void toFind(int n, int m){
//        int limit =m*10;
//        int nt=n;       //for negative array as n value after positive array will be n+limit
//        int[]positive=new int[limit];
//        int[]negative=new int[limit];
//        for(int place=0;place<limit;place++){
//            positive[place]=n;
//            n++;
//        }
//        for(int place=0;place<limit;place++){
//            negative[place]=nt;
//            nt--;
//        }
//        for (int i=0;i<positive.length;i++){
//            if(positive[i]%m==0){
//                System.out.println(positive[i]);
//                break;
//            }
//            if(negative[i]%m==0){
//                System.out.println(negative[i]);
//                break;
//            }
//        }
//    }
//}

//Problem 20 to print reverse number
//class Revers{
//    void reverseNo(int number){
//        int n=number;
//       for(int i=0;n>0;i++){
//           System.out.print(n%10);
//           n=n/10;
//       }
//    }
//}

//Problem 21 to find sum of digites of number
//class SumDigits{
//    void sumOfDigits(int number){
//       int sum=0;
//       for (int i=0;number>0;i++){
//           sum=sum+number%10;
//           number=number/10;
//       }
//        System.out.println(sum);
//    }
//}

//Problem 22
//class KthTerm{
//    void KthTerm(double A,double B,double K){
//        int C=(int)Math.pow(A,B);    //Typecasting double to integer
//        for(int i=1;i<K;i++){
//            C=C/10;
//        }
//        System.out.println(C%10);
//    }
//}

//Problem 23   binary to decimal conversion
//class decimal{
//    void decimal(long binary){
//        int sum=0;
//        int[]decimals=new int[8];
//        for (int i=0;i<8;i++){
//            int c=(int)Math.pow(2,i);
//            decimals[i]=c;
//        }
//        for(int j=0;j<decimals.length;j++){
//            if(binary%10==1){
//                sum=sum+decimals[j];
//            }
//            if(binary%10!=0 && binary%10!=1){
//                System.out.println("Type a binary code");
//                break;
//            }
//            binary=binary/10;
//        }
//        System.out.println(sum);
//    }
//}

//Problem 24
//class jumpingNumber{
//    boolean isJumping=true;
//    long[]numbers=new long[50];
//    public boolean jumpingNumber(long number){
//        long nu=number;
//        for(int i=0;number>0;i++){
//            numbers[i]=number%10;
//            number=number/10;
//        }
//        for (int j=1;nu>0;j++){
//            long plus=numbers[j]+1;
//            long minus=numbers[j]-1;
//            nu=nu/10;
//            if (numbers[j-1]!=plus && numbers[j-1]!=minus){
//                isJumping=false;
//            }
//        }
//        return isJumping;
//    }
//
//    void closerJumping(int Num){
//        if(jumpingNumber(Num)==true){
//            System.out.println("The number itself is jumping number");
//        }
//        else if(!jumpingNumber(Num)){
//                for(int i=1;i<Num;i++){
//                    long Plus=Num+i;
//                    long Minus=Num-i;
//                    if(jumpingNumber(Plus)){
//                        System.out.println(Plus);
//                        break;
//                    }
//                    else if(jumpingNumber(Minus)){
//                        System.out.println(Minus);
//                        break;
//                    }
//                    System.out.println(jumpingNumber(Minus));
//                }
//        }
//    }
//}

//Problem 25 to find LCM of number
//class LCM{
//    boolean found=false;
//    void findLcm(int a,int b){
//        for(int i=1;i<a*b;i++){
//            for(int j=1;j<a*b;j++) {
//                if (a * i == b * j){
//                    System.out.println("LCM of number is "+a*i);
//                    found=true;
//                    break;
//                }
//                if(found==true){
//                    break;
//                }
//            }
//        }
//    }
//}
//
//class GCD extends LCM{
//    void findGCD(int a, int b){
//        boolean found=false;
//        int GCD=0;
//        for(int i=1;i<Math.max(a,b);i++){
//            if (a%i==0 && b%i==0){
//                GCD=i;
//            }
//        }
//        System.out.println("GCD of given numbers is "+GCD);
//    }
//}
//
//class LCMandGCD extends GCD{
//    void findLcmGcd(int a, int b){
//        findLcm(a,b);
//        findGCD(a,b);
//    }
//}

//Problem 26  to find added fraction if form of fraction(p/q)
//class fraction{
//    void addFraction(int num1, int den1, int num2, int den2){
//        if(den1==den2){
//            int num3=num1+num2;
//            int den3=den1;
//            int max=0;
//            for (int i=2;i<=Math.max(num3,den3);i++){
//                if(num3%i==0 && den3%i==0){
//                    max=i;
//                }
//            }
//            num3=num3/max;
//            den3=den3/max;
//            System.out.printf("Added fraction is %d/%d",num3,den3);
//        }
//        else if(den1!=den2){
//            int num5=den2*num1;
//            int den5=den2*den1;
//            int num6=den1*num2;
//            int den6=den1*den2;
//            addFraction(num5,den5,num6,den6);
//        }
//    }
//}


public class Some_Practice_Que {
    public static void main(String[] args) {
//Problem 26
//        fraction gh=new fraction();
//        gh.addFraction(2,5,2,4);
//Problem 25
//        LCMandGCD hj=new LCMandGCD();
//        hj.findLcmGcd(11,3);

//        GCD bh=new GCD();
//        bh.findGCD(2,4);

//        LCM gh=new LCM();
//        gh.findLcm(8,12);

//Problem 24
//        jumpingNumber gh=new jumpingNumber();
//        gh.closerJumping(1235);
//        gh.closerJumping(1234);

//Problem 23
//        decimal gh=new decimal();
//        gh.decimal(1011);
//        gh.decimal(10001000);

//Problem 22
//        KthTerm gh=new KthTerm();
//        gh.KthTerm(3,5,3);

//Problem 21
//        SumDigits gh=new SumDigits();
//        gh.sumOfDigits(153);

//Problem 20
//        Revers bn=new Revers();
//        bn.reverseNo(122);

//Problem 19
//        find bn= new find();
//        bn.toFind(15,4);

//Problem 18
//        GP gh=new GP();
//        gh.findNth(2,2,6);

//Problem 17
//        AP nj=new AP();
//        nj.findTerm(1,5,6);

//Problem 16
//        pattern bn=new pattern();
//        bn.patter(6);

//Problem 15
//        pairsOfPrime nj=new pairsOfPrime();
//        nj.pairsOfPrime(1200);

//Prblem 1
//        empty hj=new empty();
//        hj.emptyArr(45,42,74,78,89,45);

//Problem 2
//        Scanner gh=new Scanner(System.in);
//        String nj=gh.nextLine();
//
//        reversing nm=new reversing();
//        System.out.println(nm.reverse(nj));

//Problem 3
//        int[]arr={1,2,7,8};
//        inArray jn=new inArray();
//        jn.Array=arr;
//        jn.InArray(7);

//Problem 4
//        IntCheck gh=new IntCheck();
//        System.out.println(gh.isInt(45.6));

//Problem 5
//        add bn=new add();
//        System.out.println(bn.AddElm(45,56,89,85,78));

//Problem 6
//        divisible nm=new divisible();
//        System.out.println(nm.isDivisible(45,4));

//Problem 7
//        age jk=new age();
//        jk.todayDate(3,6,2022);
//        jk.BirthDate(4,6,2001);

//Problem 8
//        hailstone gh=new hailstone();
//        gh.Hailstone(5);

//Problem 9
//        odd nm=new odd();
//        nm.oddSeries(5,20);

//Problem 10
        Prime nm=new Prime();
        nm.isPrime(47);

//Problem 11
//        sumP nj=new sumP();
//        System.out.println(nj.SumOfPrimeUpto(43));

//        pairOfP m=new pairOfP();
//        m.pairsOfP(5);


//Problem 14
//        angstrong hj=new angstrong();
//        hj.angstrong(372);
//        angstrong hj=new angstrong();
//        hj.angstrong(1634);
    }
}
