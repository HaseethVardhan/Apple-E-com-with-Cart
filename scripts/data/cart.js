
import { products } from "./products.js";
 
export let cart = JSON.parse(localStorage.getItem("Cart")) || [];

export function addToCart(productid) {
    
    let alreadyExist = false;

    cart.forEach((productId, index) => {
        if(cart[index].productId === productid){
            let x = Number(cart[index].productQuantity);
            x=x+1;
            cart[index].productQuantity = JSON.stringify(x);
            alreadyExist = true;
        }
    });

    save();
    
    if(alreadyExist){
        return;
    }

    products.forEach((productId, index) => {
        if (products[index].productId === productid) {
            cart.push({
                productId: `${products[index].productId}`,
                productName: `${products[index].productName}`,
                productPrice: `${products[index].productPrice}`,
                productImage: `${products[index].productImage}`,
                productQuantity : `${products[index].productQuantity}`
            },);
        }
    });

    save();
}

export function getShippingPrice(){
    let shipping = '';
    if(document.getElementById('standard').checked){
        shipping = document.getElementById('standard').value;
    }else if(document.getElementById('quick').checked){
        shipping = document.getElementById('quick').value;
    }else{
        shipping = document.getElementById('oneday').value;
    }
    return Number(shipping);
}

export function save(){
    localStorage.setItem("Cart", JSON.stringify(cart));
}