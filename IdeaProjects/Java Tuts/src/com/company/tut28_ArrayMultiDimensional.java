package com.company;

public class tut28_ArrayMultiDimensional {
    public static void main(String[] args) {     //Multidimensional arrays
        int[][]marks={{1,2,3},{5,6,7},{8,9,87}};
        System.out.println(marks[0][2]);


        int [][]hj=new int[2][3];
        hj[0][0]=101;
        hj[0][1]=102;
        hj[0][2]=103;
        hj[1][0]=201;
        hj[1][1]=202;
        hj[1][2]=203;
        System.out.println(hj.length);


        //Printing 2d array
        for(int i=0;i<= hj.length-1;i++){
            for(int u=0;u<= hj[i].length-1;u++){
                System.out.println(hj[i][u]);
            }
        }



    }
}
