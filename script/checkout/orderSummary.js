import { cart, removeFromCart, updateQuantity } from '../../data/cart.js';
import {  products } from '../../data/products.js';
import { renderCheckOutHeader } from './checkoutheader.js';
import { renderPaymentSummary } from './paymentSummary.js';

renderOrderSummary()

export function renderOrderSummary() {

  if (cart.length === 0) {
  document.querySelector('.js-order-summary').innerHTML = `
    <div class="empty-cart">
      <p>Your cart is empty</p>
      <a href="index.html" class="button-soft">Go Shopping</a>
    </div>
  `;
  return;
}
 
  let cartSummaryHTML = '';

   

  cart.forEach((cartItem) => {
    const productId = cartItem.productId

   let matchingProduct;


   products.forEach((product) => {
    if(product.id === productId) {
      matchingProduct = product

    }
   })

  

    cartSummaryHTML += `
                   <div class="cart-item-container 
                    js-cart-item-container
                    js-cart-item-container-${matchingProduct.id}">
                    <div class="delivery-date">
                    Delivery date: 20th May 2026
                    </div>



                    <div class="cart-item-details-grid">
                      <img class="product-image"
                        src="${matchingProduct.image}">

                      <div class="cart-item-details">
                        <div class="product-name">
                          ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                          $${((matchingProduct.priceCents) / 100).toFixed(2)}
                        </div>
                        <div class="product-quantity 
                         js-product-quantity-${matchingProduct.id}">
                          <span>
                            Quantity: <span class="quantity-label 
                            js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                          </span>
                            <span class = "update-quantity-link js-update-link link-primary"
                             data-product-id="${matchingProduct.id}">
                              Update
                              </span>
                              <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
                              <span class = "save-quantity-link js-save-link link-primary"
                                data-product-id="${matchingProduct.id}">
                                Save
                                </span>
                          <span class="delete-quantity-link js-delete-link link-primary"
                            data-product-id="${matchingProduct.id}">
                            Delete
                          </span>
                        </div>
                      </div>
                           
                      
                    </div>
                  </div>
                  ` 

  })

   document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        removeFromCart(productId);

        renderCheckOutHeader()
        renderOrderSummary();
        renderPaymentSummary()
      })
    });


    document.querySelectorAll('.js-update-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`)

        container.classList.add('is-editing-quantity')
      })
    });


    document.querySelectorAll('.js-save-link').forEach((link) => {
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`)

      //for click event
      link.addEventListener('click', () => {
        saveQuantity(productId, quantityInput)
      })

       //for keydown event
       quantityInput.addEventListener('keydown', (event) => {
          if(event.key === 'Enter') {
            saveQuantity(productId, quantityInput)
          }
       })
     })


    function saveQuantity(productId, quantityInput) {
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      const newQuantity = Number(quantityInput.value);

      //validation

                        if(newQuantity < 1 || newQuantity >= 1000) {
                          alert('Quantity must be atleast 1 and less than 1000');
                          return; //early return
                        }


      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);

      quantityLabel.innerHTML = newQuantity;

      renderCheckOutHeader()
      renderOrderSummary();
      renderPaymentSummary()
    }


     
}