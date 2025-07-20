package com.company;

class customer {
    String name;
    String address;

    void setName(String Name) {
        name = Name;
    }

    void setAddress(String Address) {
        address = Address;
    }

    void getAddress() {
        System.out.println(address);
    }

    void getName() {
        System.out.println(name);
    }

    void login(String AccName) {
        System.out.println("You logged into " + AccName);
    }

    void logout() {
        System.out.println("You logged out of your account");
    }
}

class shoppingCart {
    int quantity = 0;
    String[] cart = new String[20];

    void addItem(String Item) {
        cart[quantity] = Item;
        System.out.println(Item + " has been added to your cart");
        quantity++;
    }

    void removeItem(String Item) {
        for (int i = 0; i <= quantity; i++) {
            if (Item == cart[i]) {
                cart[i] = null;
            }
        }
        System.out.println(Item + " has been removed from your cart");
    }

    void showCart() {
        for (int i = 0; i < quantity; i++) {
            if (cart[i] != null) {
                System.out.println(cart[i]);
            }
        }
    }
}

class products{
    String name;
    int price;
    int quantityAvailable;
    int quantity = 0;
    String[] Products = {};

    void addItem(String name) {
        Products[quantity] = name;
        quantity++;
    }

    void tellQuantity() {
        System.out.println(quantity);
    }
}

class productPrice{
    int product=0;
    int price=0;
    String[][]ProPrice=new String[20][20];
    void setProductPrice(String name, String Price){
        ProPrice[product][price]=name;
        price++;
        ProPrice[product][price]=Price;
        price=0;
        product++;
    }
    void getProductPrice(){
        for(int i=0;i<ProPrice.length;i++){
            for(int j=0;j<ProPrice[i].length;j++){
                if(ProPrice[i]!=null && ProPrice[i][j]!=null) {
                    System.out.println(ProPrice[i][j]);
                }
            }
        }
    }

    void removeProductPrice(String name){
        for (int i=0;i<ProPrice.length;i++){
            for (int j=0;j<ProPrice[i].length;j++){
                if(ProPrice[i][j]==name){
                    ProPrice[i][j]=null;
                    ProPrice[i][j+1]=null;
                }
            }
        }
    }
}

public class fromCourse {
    public static void main(String[] args) {
        productPrice gh = new productPrice();
        gh.setProductPrice("bucket", "100");
        gh.setProductPrice("bu", "10");
        gh.setProductPrice("Cap","200");
        gh.getProductPrice();
        gh.removeProductPrice("bucket");
        gh.getProductPrice();

    }
}
