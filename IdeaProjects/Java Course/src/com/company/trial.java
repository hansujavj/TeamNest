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
    int a=1;
    String[] cart = new String[20];

    void addItem(String Item) {
        cart[quantity]=Item;
        System.out.println(Item + " has been added to your cart");
        quantity=quantity+1;
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
            System.out.println(cart[i]);
        }
    }
}

class products {
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

public class trial {
    public static void main(String[] args) {
     shoppingCart bh=new shoppingCart();
     bh.addItem("Bucket");
     bh.addItem("Cup");
     bh.showCart();
    }
}
