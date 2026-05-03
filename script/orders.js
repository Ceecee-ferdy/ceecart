import { getProduct } from '../data/products.js'
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {  addToCart, calculateCartQuantity, cart} from "../data/cart.js";

loadPage()

function loadPage() {
  
       updateCartQuantity(); 

    if (orders.length === 0) {
     document.querySelector('.js-orders-grid').innerHTML = `
      <div class="empty-orders">
      <p>No orders yet.</p>
      <a href="index.html" class="button-soft">Start Shopping</a>
    </div>
     `;
     return;
    }

    let ordersHTML = ''

  orders.forEach((order) => {
     const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    

      ordersHTML += `
        <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>

            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(order.totalCostCents / 100).toFixed(2)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
         `;

        function productsListHTML(order) {
          let productsListHTML = '';

          order.products.forEach((productDetails) => {
          const product = getProduct(productDetails.productId);
          
          productsListHTML += `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
              dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
            }
          </div>
          <div class="product-quantity js-product-quantity-${product.id}">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button js-buy-again button-primary"
             data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsListHTML;
  }

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
  });

    
      function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();

          document.querySelector('.js-cart-quantity')
          .innerHTML = cartQuantity;
     }
     

       document.querySelectorAll('.js-buy-again').forEach((button) => {
     button.addEventListener('click', () => {
     const productId = button.dataset.productId;

      addToCart(productId);
      updateCartQuantity();
      
     /*
      let matchingItem;

      cart.forEach((cartItem) => {
        if(cartItem.productId === productId) {
          matchingItem = cartItem
        }
      });

      const quantityContainer = document.querySelector(`.js-product-quantity-${productId}`);
      
       quantityContainer.innerHTML = `Quantity: ${productDetails.quantity}`
       */

      button.innerHTML = 'Added';
 
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
         `
      }, 1000);
   })
 })
  
}


 



