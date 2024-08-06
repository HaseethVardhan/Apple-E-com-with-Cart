import { products } from "./data/products.js";
import { addToCart } from "./data/cart.js";

let productHTML = '';

function renderProducts(){

    products.forEach((value, index) => {
        productHTML += `
        <div class="css-product">
        <h1 class="css-product-price">Starts from ${products[index].productPrice}</h1>
        <h1 class="css-product-title">${products[index].productName}</h1>
        <img src="${products[index].productImage}" class="css-product-image">
        <button data-product-id="${products[index].productId}" class="css-add-to-cart js-add-to-cart">Add to Cart</button>
    </div>
        `
    });

    document.querySelector('.js-product-wrapper').innerHTML = productHTML;
}

renderProducts();
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        addToCart(button.dataset.productId);
    });
});
