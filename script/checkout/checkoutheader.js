import { cart } from '../../data/cart.js';

renderCheckOutHeader();

export function renderCheckOutHeader() {
  let checkOutHeaderHtml = ''

  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity
  });

   checkOutHeaderHtml += 
    `
      <div class="header-content">
        <div class="checkout-header-left-section">
        <a href="index.html" class="link-wrap">
            <div class="logo">
        <span class="logo-text">CeeCart</span>
      </div> 
        </a>
        </div>

        <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-return-to-home-link"
        href="index.html">${cartQuantity}</a>)
        </div>

        <div class="checkout-header-right-section">
        <img src="images/checkout-lock-icon.png">
        </div>
        </div>
  
    `

    document.querySelector('.js-checkout-header')
     .innerHTML = checkOutHeaderHtml

}