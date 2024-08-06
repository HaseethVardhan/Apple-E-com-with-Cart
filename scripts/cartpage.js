import { getShippingPrice} from "./data/cart.js";

let cart = JSON.parse(localStorage.getItem("Cart")) || [];



export function renderCartItems(){
    let cartItem = document.querySelector('.js-cart-wrapper');
    let cartItemHTML = '';


    cart.forEach((val, index) => {

        cartItemHTML += `
        <div class="css-cart-item">
        <div class="css-cart-img-container">
            <img class="css-cart-item-img" src="${cart[index].productImage}">
        </div>
        <div class="css-cart-details">
            <p class="css-cart-item-name">${cart[index].productName.toUpperCase()}</p>
            <p class="css-cart-item-price">${cart[index].productPrice}RS</p>
            <p class="css-item-quantity"><button class="js-item-increase" data-product-idd="${cart[index].productId}">+</button>${cart[index].productQuantity}<button class="js-item-decrease" data-product-idd="${cart[index].productId}">-</button></p>
        </div>
    </div>
        `;
    });

    if(cartItemHTML === '' || (cart.length===1 && cart[0].productQuantity<1)){

        document.querySelector('.js-cart-delivery').innerHTML = ``;

        document.querySelector('.js-all-wrapper').innerHTML = `
            <div class="css-no-cart">
                Add Products to the Cart
            </div>    
        `;
    }

    cartItem.innerHTML = cartItemHTML;
    document.querySelectorAll('.js-item-decrease').forEach((button)=>{
        button.addEventListener('click', ()=>{
            cart.forEach((val,index)=>{
                if(button.dataset.productIdd===cart[index].productId){
                    if((cart[index].productQuantity==='1' && cart.length===1)){
                        cart[index].productQuantity--;
                        localStorage.removeItem("Cart");
                        renderCartItems();
                    }else if(cart[index].productQuantity<='1' ){
                        cart[index].productQuantity--;
                        let x = cart.splice(index,1);
                        localStorage.setItem("Cart", JSON.stringify(cart));
                        renderCartItems();
                    }else{
                        cart[index].productQuantity--;
                        localStorage.setItem("Cart", JSON.stringify(cart));
                        renderCartItems();
                    }
                }
            })
        })
    })
    document.querySelectorAll('.js-item-increase').forEach((button)=>{
        button.addEventListener('click', ()=>{
            cart.forEach((val, index)=>{
                if(cart[index].productId===button.dataset.productIdd){
                    cart[index].productQuantity++;
                    localStorage.setItem("Cart", JSON.stringify(cart));
                    renderCartItems();
                }
            })
        })
    })
    renderPriceSummary();
}
renderCartItems();



function renderPriceSummary(){
    if(cart.length===0){
        // document.querySelector('.js-price-summary').innerHTML = `None`;
    }else{
        let price = 0;
        cart.forEach((val,index)=>{
            price += Number(cart[index].productPrice)*Number(cart[index].productQuantity);
        })
        let tax = (price/100)*3;
        let total = price+tax;
        let ship = getShippingPrice();
        document.querySelector('.js-price-summary').innerHTML = `
        <h1>Price Summary</h1>
        <p>Products: ${JSON.stringify(price)}</p>
        <p>Tax: ${JSON.stringify(tax)}</p>
        <p>Total: ${JSON.stringify(total)}</p>
        <p>Total after shipping: ${JSON.stringify(total+ship)}</p>
        `;
        let today = dayjs();
        if(ship===0){
            let deliverydate = today.add(7,'days');
            deliverydate = deliverydate.format("DD, MMMM YYYY");
            document.querySelector('.js-cart-expectedtime').innerHTML=`
            Expected Delivery on ${deliverydate}
            `;
        }else if(ship===100){
            let deliverydate = today.add(3,'days');
            deliverydate = deliverydate.format("DD, MMMM YYYY");
            document.querySelector('.js-cart-expectedtime').innerHTML=`
            Expected Delivery on ${deliverydate}
            `;
        }else{
            let deliverydate = today.add(1,'days');
            deliverydate = deliverydate.format("DD, MMMM YYYY");
            document.querySelector('.js-cart-expectedtime').innerHTML=`
            Expected Delivery on ${deliverydate}
            `;
        }
    }

}

document.querySelectorAll('.js-delivery-radio').forEach((val)=>{
    val.addEventListener('click', ()=>{
        renderPriceSummary();
    })
})