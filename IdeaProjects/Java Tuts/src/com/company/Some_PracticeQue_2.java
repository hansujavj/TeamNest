package com.company;

//Problem 1 to find GCD of an array
//class GCDArray{
//    void GCDofArray(int...arr){
//        int GCD=0;
//        if(arr.length==1){
//            GCD=arr[0];
//            System.out.println("GCD of one number is always the number itself so GCD is "+GCD);
//        }
//        if(arr.length==2){
//            for(int i=1;i<Math.max(arr[0],arr[1]);i++){
//                if (arr[0]%i==0 && arr[1]%i==0){
//                    GCD=i;
//                }
//            }
//            System.out.println("GCD of given numbers is "+GCD);
//        }
//        if(arr.length==3) {
//            for (int i = 2; i < arr.length; i++) {
//                for (int j = 1; j < 100; j++) {
//                    if (arr[i] % j == 0 && arr[i - 1] % j == 0 && arr[i - 2] % j == 0) {
//                        GCD=i;
//                    }
//                }
//                System.out.println("GCD of array is "+GCD);
//            }
//        }
//        if(arr.length>=4) {
//            boolean found= true;
//            for (int i = 3; i < arr.length; i++) {
//                for (int j = 2; j < 100; j++) {
//                    if (arr[i] % j == 0 && arr[i - 1] % j == 0 && arr[i - 2] % j == 0 && arr[i-3]%j==0) {
//                        int x=j;
//                        for(int n=0;n< arr.length;n++){
//                            if (arr[n]%x!=0){
//                                found=false;
//                                 break;
//                            }
//                        }
//                        if (found==true){
//                            GCD=x;
//                        }
//                    }
//                }
//            }
//            System.out.println("GCD of array is "+GCD);        }
//    }
//}


////Problem 2 to find factorial of a number
//class factorioal{
//    int factorial(int number){
//        int fac=1;
//        for(int i=number;i>0;i--){
//            fac=fac*i;
//        }
//       return fac;
//    }
//}
////Problem 3
//class nPr extends factorioal{
//    int nPr(int n,int r){
//        int P=factorial(n)/factorial(n-r);
//        return P;
//    }
//}
////Problem 4
//class nCr extends factorioal{
//    int nCr(int n, int r){
//        int D=factorial(r)*factorial(n-r);
//        int C=factorial(n)/D;
//    return C;
//    }
//}


//Problem 5 to find largest prime factor of a number
//class Prime{
//    boolean isPrime(int num){
//        boolean IsPrime=true;
//        for (int i=2;i<num;i++){
//            if(num%i==0){
//                IsPrime=false;
//            }
//        }
//        return IsPrime;
//    }
//}
//class primeFactor extends Prime{
//    int PrimeFactor(int number){
//        int PFactor=0;
//        for(int i=2;i<number;i++){
//            if(isPrime(i) && number%i==0){
//                PFactor=i;
//            }
//        }
//        return PFactor;
//    }
//}


//Problem 6 to find if number is perfect(if its factorial sum = number itself)
//class perfect{
//    boolean IsPerfect(int number){
//        boolean isPerfect=false;
//        int sum=0;
//        for(int i=1;i<number;i++){
//            if(number%i==0){
//                sum=sum+i;
//            }
//        }
//        if (sum==number){
//            isPerfect=true;
//        }
//        return isPerfect;
//    }
//}

//Problem 7 to find pairs of number a and b such that a^3+b^3=N
//class pairCubeCount{
//    int pairCubeCount(int N){
//        int pairs=0;
//        for (int a=1;a<N;a++){
//            for(int b=0;b<N;b++){
//                if(Math.pow(a,3)+Math.pow(b,3)==N){
//                    pairs++;
//                }
//            }
//        }
//        return pairs;
//    }
//}

//Problem 8
//class sieveOfEranthones{
//    public boolean isPrime(int a) {
//        boolean IsPrime = true;
//        for (int i = 2; i < a; i++) {
//            if (a % i == 0 && a != i) {
//                IsPrime = false;
//            }
//        }
//        return IsPrime;
//    }
//    int[]primeNums=new int[50];
//    int place=0;
//    void sumOfPrime(int upto){
//        for(int i=1;i<upto;i++){
//            if(isPrime(i)==true){
//                primeNums[place]=i;
//                place++;
//            }
//        }
//        int sum=0;
//        for(int j=0;j<primeNums.length;j++){
//            sum=sum+primeNums[j];
//        }
//        System.out.println(sum);
//    }
//}


//Problem 9
//class pairsOfPrime{
//    int[]primeArray=new int[100];
//    public boolean isPrime(int a){
//        boolean IsPrime = true;
//        for (int i = 2; i <= 10; i++) {
//            if (a % i == 0 && a != i) {
//                IsPrime = false;
//            }
//        }
//        return IsPrime;
//    }
//    void pairsOfPrime(int upto){
//        int place=0;
//        for(int i=1;i<100;i++){
//            if(isPrime(i)==true){
//                primeArray[place]=i;
//                place++;
//            }
//        }
//        int m=0;
//        int n=0;
//        for(int i=0;i<26;i++){
//            for(int j=0;j<26;j++){
//                if (primeArray[i]*primeArray[j]<=upto && primeArray[i]!=0 && primeArray[j]!=0){
//                    m=primeArray[i];
//                    n=primeArray[j];
//                }
//            }
//        }
//        System.out.println(m);
//        System.out.println(n);
//
//    }
//}

//Problem 10 to find number of squares under N
//class countSquare{
//    int countSquare(int N){
//        int count=0;
//        for (int i=1;i<N;i++){
//            if(i*i<=N){
//                System.out.println(i*i);
//                count++;
//            }
//        }
//        return count;
//    }
//}


import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.stream.IntStream;

//Problem 11 to find number having 3divisors under N
//class Divisors {
//    void Divisors(int N) {
//        int divisors = 0;
//        for (int i = 1; i < N; i++) {
////            System.out.println(divisors);
//            for (int j = 1; j < N; j++) {
//                if (i % j == 0) {
//                    divisors++;
//                }
//            }
//            if (divisors == 3) {
//                System.out.println(i);
//            }
//            divisors=0;
//        }
//    }
//}

//Problem 12 to find sum of array from given index
//class arraySum{
//    int arraySum(int a, int b,int...arr ){
//        int sum=0;
//        for(int i=a;i<=b;i++){
//            sum=sum+arr[i];
//        }
//        return sum;
//    }
//}

//Problem 13
//class jumpRequired{
//    int jumpRequired(int...arr){
//        int jump=0;
//        int sum=0;
//        for(int i=0;i<arr.length;i++){
//            if(arr[i]==0){
//                break;
//            }
//            sum=sum+arr[i];
//            jump++;
//            if(sum>= arr.length){
//                break;
//            }
//        }
//        return jump;
//    }
//}


//Problem 14 height of tower
//class height2{
//    void height2(int K,int...arr){
//        int[]arrM=new int[arr.length];
//        int place=0;
//        for(int i=0;i<arr.length;i++){
//            if(arr[i]<K){
//                arr[i]=arr[i]+K;
//                arrM[place]=arr[i];
//                place++;
//            }
//            else if(arr[i]>=K){
//                arr[i]=arr[i]-K;
//                arrM[place]=arr[i];
//                place++;
//            }
//        }
//        int max=0;
//        for(int j=0;j<arrM.length;j++){
//            if(arrM[j]>max){
//                max=arrM[j];
//            }
//        }
//        System.out.println(max);
//        int min=max;
//        for(int i=0;i<arrM.length;i++){
//            if (arrM[i]<min){
//                min=arrM[i];
//            }
//        }
//        System.out.println(min);
//        System.out.println("Difference between largest and smallest is "+(max-min));
//    }
//}

//Problem 15 to find missing number in an array
//class missingNumber{
//    void missingNum(int...arr){
//        int max=0;
//        for(int j=0;j<arr.length;j++){
//            if(arr[j]>max){
//                max=arr[j];
//            }
//        }
//        System.out.println(max);
//        int min=max;
//        for(int i=0;i<arr.length;i++){
//            if (arr[i]<min){
//                min=arr[i];
//            }
//        }
//        System.out.println(min);
//        for(int i=min;i<max;i++){
//            boolean found=false;
//            for(int j=0;j< arr.length;j++){
//                if(arr[j]==i){
//                    found=true;
//                    break;
//                }
//            }
//            if(found==false){
//                System.out.println(i);
//            }
//        }
//    }
//}

//Problem 16 to find duplicate number in an array
//class duplicate{
//    void  duplicate(int...arr){
//        int found=0;
//        for(int i=0;i<arr.length;i++){
//            for(int j=0;j<arr.length;j++){
//                if(arr[i]==arr[j] && i!=j && found!=arr[i]){
//                    System.out.println(arr[i]);
//                    found=arr[i];
//                }
//            }
//        }
//    }
//}

//Problem 17
//class KthSmallest{
//    void KthSmallest(int K,int...arr){
//        Arrays.sort(arr);
//        System.out.println(arr[K-1]);
//    }
//}

//Problem 18 to sort an array(althogh you can do this by Arrays.sort(array name)
//class sort{
//    void sorted(int...arr) {
//        for (int i = 0; i < arr.length; i++) {
//            for (int j = i + 1; j < arr.length; j++) {
//                int tmp = 0;
//                if (arr[i] > arr[j]) {
//                    tmp = arr[i];
//                    arr[i] = arr[j];
//                    arr[j] = tmp;
//                }
//            }
//        }
//        for(int i=0;i<arr.length;i++){
//            System.out.println(arr[i]);
//        }
//    }
//}


//Problem 19 to fond majority of an array
//class majority{
//    void majority(int...arr){
//        int one=0;
//        for(int i=0;i<arr.length;i++){
//            int occur=0;
//            for(int j=0;j<arr.length;j++){
//                if(arr[i]==arr[j] && one!=arr[i]){
//                    occur++;
//                }
//            }
//            if(occur== (arr.length/2)){
//                one=arr[i];
//                System.out.println(arr[i]);
//            }
//        }
//    }
//}


//Problem 20 to find peak(number greater than its neighbouring element) number of array if found return 1
//class peak{
//    int peak(int ...arr){
//        for(int i=1;i<arr.length;i++){
//            if(arr[i]>arr[i-1] && i<arr.length-1){
//                if(arr[i]>arr[i+1]){
//                    System.out.println("preak is at index "+i);
//                    return 1;
//                }
//            }
//            if(i==arr.length-1 && arr[i]>arr[i-1]){
//                System.out.println("preak is at index "+i);
//                return 1;
//            }
//        }
//        return 0;
//    }
//}


//Problem 21 to find no of inversion for being an sorted array
//class inversionCount{
//    int inversionCount(int...arr){
//        int count =0;
//        for(int i=0;i<arr.length;i++){
//            for(int j=i+1;j<arr.length;j++){
//                if(arr[i]>arr[j]){
//                    count++;
//                }
//            }
//        }
//        return count;
//    }
//}


//Problem 21 eqillibrium point
//class equilibreium{
//    void equilibrium(int...arr){
//        int sum=0;
//        int sumR=0;
//        boolean found=false;
//        for(int i=0;i<arr.length;i++){
//            sum=sum+arr[i];
//            sumR=0;
//            for (int j=arr.length-1;j>=0;j--){
//                sumR=sumR+arr[j];
//                if(sum==sumR && i==j){
//                    System.out.println(i);
//                    found=true;
//                    break;
//                }
//                else if(arr.length==1){
//                    System.out.println(arr[0]);
//                }
//            }
//        }
//        if(found==false){
//            System.out.println("No equilibrium point found");
//        }
//    }
//}


//Problem 23
//class leader{
//    leader(int...arr){
//        int max=0;
//        for(int i=arr.length-1;i>=1;i--){
//            if(max<=arr[i]){
//                max=arr[i];
//                System.out.println(max);
//            }
//        }
//    }
//}

//Problem 24  to find if any power to x form y
//class power{
//    power(int x, int y){
//        int digit=1;
//        boolean found=false;
//        for(int i=1; i<100;i++){
//            digit=digit*x;
//            if(digit==y){
//                found=true;
//                System.out.println(y+" is "+i+" power of "+x);
//                break;
//            }
//        }
//        if(found==false){
//            System.out.println(y+" doesnt come under powers of "+x);
//        }
//    }
//}

//Problem 25
//class formSquare{
//    formSquare(int x1, int y1, int x2, int y2,int x3, int y3, int x4, int y4){
//        if(x3-x2==x4-x1 && y2-y1==y3-y4 || x1-x2==x4-x3 && y3-y2==y4-y1){
//            System.out.println("Its a square");
//        }
//        if(x3-x2==x4-x1 && y2-y1==y3-y4){
//            System.out.println("Its a square");
//        }
//        else{
//            System.out.println("Its not a square");
//        }
//    }
//}

//Problem 26 to find trailing zeros in factorial of number
//class trailingZero{
//    int factorial(int N){
//        int factorial=1;
//        for(int i=N;i>0;i--){
//            factorial=factorial*i;
//        }
//        return factorial;
//    }
//    int trailingZeros(int N){
//        int zeros=0;
//        for(int i=factorial(N);i>0;i=i/10){
//            if(i%10==0){
//                zeros++;
//            }
//        }
//        return zeros;
//    }
//}

//Problem 27
//class angle{
//    void angle(int H ,int M){
//        ArrayList<Integer> hours=new ArrayList();
//        hours.add(1);hours.add(2);hours.add(3);hours.add(4);hours.add(5);hours.add(6);hours.add(7);hours.add(8);hours.add(9);hours.add(10);hours.add(11);hours.add(12);
//        hours.add(1);hours.add(2);hours.add(3);hours.add(4);hours.add(5);hours.add(6);hours.add(7);hours.add(8);hours.add(9);hours.add(10);hours.add(11);hours.add(12);
//        System.out.println(hours);
//        int Hind=hours.indexOf(H)+1;
//        int min=M/5;
//        int Mind=hours.lastIndexOf(min)+1;
//        int HandDiff=Mind-Hind;
//        if(HandDiff>6){
//            Mind=hours.indexOf(min)+1;
//            HandDiff=Hind-Mind;
//        }
//        System.out.println(HandDiff*30);
//    }
//}


//Problem 28  to find open doors. firstly all doors are closed. then u go from one to end open all doors then from 2 to end close doors then 3-end opening doors and so on till last door
//class openDoors{     //using arrayList
//    void openDoors(int door){
//        ArrayList<Integer> doors=new ArrayList<>(door);
//        for(int i=0;i<door;i++){
//            doors.add(0);
//        }
//        for(int i=0;i<door;i++){
//            for(int j=i;j<door;j++){
//                if(doors.get(j)==0){
//                    doors.set(j,1);
//                    continue;
//                }
//                if(doors.get(j)==1){
//                    doors.set(j,0);
//                    continue;
//                }
//            }
//        }
//        System.out.println(doors);
//        int openDoors=0;
//        for(int i=0;i<door;i++){
//            if(doors.get(i)==1){
//                openDoors++;
//            }
//        }
//        System.out.println(openDoors);
//    }
//}
////class openDoors{   //using array
////    void openDoors(int size){
////        int[]doors=new int[size];
////        for(int i=0;i<size;i++){
////            doors[i]=0;
////        }
//////        for(int i=0;i<size;i++){
//////            System.out.println(doors[i]);;
//////        }
////
////        for(int i=0;i<size;i++){
////            for(int j=i;j<size;j++){
////                if(doors[j]==0){
////                    doors[j]=1;
////                    continue;
////                }
////                if(doors[j]==1){
////                    doors[j]=0;
////                    continue;
////                }
////            }
////        }
////        for(int i=0;i<size;i++){
////            System.out.println(doors[i]);;
////        }
////    }
////}

//Problem 29  to find if number is an triangular number
//class triangularNum{
//    triangularNum(int num){
//        int sum=0;
//        boolean yes=false;
//        for(int i=0;i<num;i++){
//            sum=sum+i;
//            if(sum==num){
//                System.out.println("Yes its an triangular number");
//                yes=true;
//                break;
//            }
//        }
//        if(yes==false){
//            System.out.println("Its not a triangular number");
//        }
//    }
//}


//Problem 30 to find nth even number of fibonacci series
//class fibonacci{
//    long fibonacci(int N){
//        long[] arr=new long[N*5];
//        arr[0]=0;
//        arr[1]=1;
//        for(int i=2;i<arr.length;i++){
//            arr[i]=arr[i-1]+arr[i-2];
//        }
//        int k=0;
//        for(int i=0;i<arr.length;i++){
//            if(arr[i]%2==0) {
//                k++;
//            }
//            if(k==N){
//                return arr[i];
//            }
//
//        }
//        return 0;
//    }
//}

public class Some_PracticeQue_2 {
    public static void main(String[] args) {

//        fibonacci gh=new fibonacci();
//        System.out.println(gh.fibonacci(1));

//Problem 29
//        triangularNum gh=new triangularNum(6);
//        triangularNum gh=new triangularNum(55);

//Problem 28
//        openDoors gh=new openDoors();
//        gh.openDoors(10);
//        gh.openDoors(4);

//Problem 27
//        angle hj=new angle();
//        hj.angle(9,40);

//Problem 26
//        trailingZero gh= new trailingZero();
//        System.out.println(gh.factorial(5));
//        System.out.println(gh.trailingZeros(10));

//Problem 25
//        formSquare gh=new formSquare(20,10,10,20,20,20,10,10);

//Problem 24
//        power gh=new power(1,3);
//        power kh=new power(2,8);


//Problem 23
//        leader gh=new leader(16,17,4,6,5,2);
//        leader gk=new leader(1,2,3,4,0);


//Problem 22
//        equilibreium gh=new equilibreium();
//        gh.equilibrium(1,2,3,5,2,3,1);
//        gh.equilibrium(1,3,5,2,2);
//        gh.equilibrium(1,5,5,2,4,7);
//        gh.equilibrium(1,5,5,2,4,13);

//Problem 21
//        inversionCount gh=new inversionCount();
//        System.out.println(gh.inversionCount(2,3,4,5,6));
//        System.out.println(gh.inversionCount(6,5,4,3,2));
//        System.out.println(gh.inversionCount(10,10,10));

//Problem 20
//        peak gh=new peak();
//        System.out.println(gh.peak(1,2,3));

//Problem 19
//        majority jk=new majority();
//        int[]arr={5,2,3,3,2};
//        jk.majority(arr);


//Problem 18
//        sort gh=new sort();
//        int[]arr={1,2,4,6,7,2,3};
//        gh.sorted(arr);

//Problem 17
//        KthSmallest gh=new KthSmallest();
//        int[]arr={7,10,4,3,20,15};
//        gh.KthSmallest(3,arr);

//Problem 16
//        duplicate gh=new duplicate();
//        int[]array={6,1,2,6,3,4,7,10,5};
//        int[]arra={2,3,1,2,3};
//        gh.duplicate(arra);

//Problem 15
//        missingNumber gh=new missingNumber();
//        int[]array={6,1,2,8,3,4,7,10,5};
//        gh.missingNum(array);

//Problem 14
//        height2 gh=new height2();
//        int[]arr={1,5,8,10};
//        gh.height2(2,arr);

//Problem 13
//        jumpRequired gh=new jumpRequired();
//        int[]arr={1,0,4,7,8,5,8};
//        System.out.println(gh.jumpRequired(arr));

//Problem 12
//        arraySum gh=new arraySum();
//        int[]arr={1,2,4,7,8,5,8};
//        System.out.println(gh.arraySum(3,5,arr));

//Problem 11
//        Divisors gh=new Divisors();
//        gh.Divisors(10);

//Problem 10
//        countSquare gh=new countSquare();
//        System.out.println(gh.countSquare(3));

//Problem 9
//        pairsOfPrime nj= new pairsOfPrime();
//        nj.primearray();
//        nj.pairsOfPrime(8);

//Problem 8
//        sieveOfEranthones hj=new sieveOfEranthones();
//        hj.sumOfPrime(10);

//Problem 7
//        pairCubeCount hj=new pairCubeCount();
//        System.out.println(hj.pairCubeCount(9));

//Problem 6
//        perfect hj=new perfect();
//        System.out.println(hj.IsPerfect(6));

//Problem 5
//        primeFactor hj= new primeFactor();
//        System.out.println(hj.PrimeFactor(25));
//Problem 4
//        nCr gh=new nCr();
//        System.out.println(gh.nCr(2,4));

//Problem 3
//        nPr gh=new nPr();
//        System.out.println(gh.nPr(3,3));
//Problem 2
//        factorioal gh=new factorioal();
//        System.out.println(gh.factorial(4));
//Problem 1
//        GCDArray gh=new GCDArray();
//        int[]array={15,6,18,6,12};
//        gh.GCDofArray(array);
    }
}