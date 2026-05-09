import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import {  products } from '../../data/products.js';
import { renderCheckoutHeader } from './checkoutheader.js';
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';

renderOrderSummary()

export function renderOrderSummary() {

  if (cart.length === 0) {
  document.querySelector('.js-order-summary').innerHTML = `
    <div class="empty-cart">

      <div class="empty-cart-icon">
        🛒
      </div>

      <h2>Your cart feels lonely</h2>

      <p>
        Add some amazing products and come back here.
      </p>

      <a href="index.html" class="empty-cart-button">
        Continue Shopping
      </a>

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

       if (!cartItem.deliveryOptionId) {
        cartItem.deliveryOptionId = '1';
      }

        const deliveryOptionId = cartItem.deliveryOptionId;

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);

  

    cartSummaryHTML += `
                   <div class="cart-item-container 
                    js-cart-item-container
                    js-cart-item-container-${matchingProduct.id}">
                     <div class="delivery-date">
                    Delivery date: ${dateString}
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
                       
                      
                <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
                      
                    </div>
                  </div>
                  ` 

  })

   function deliveryOptionsHTML(matchingProduct, cartItem) {        
          //firstly, we loop through our deliveryOptions     
            //next for each deliveryOption, we will generate html
            //lastly we combine the html together

              let html = ''

              deliveryOptions.forEach((deliveryOption) => {

              const dateString = calculateDeliveryDate(deliveryOption);

              const priceString = deliveryOption.priceCents === 0
                ? 'FREE'
                : `$${(deliveryOption.priceCents / 100).toFixed(2)} -`;

                  const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                        <div class="delivery-option js-delivery-option
                         js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
                          data-product-id = "${matchingProduct.id}"
                          data-delivery-option-id = "${deliveryOption.id}">
                          <input type="radio"
                            ${isChecked ? 'checked' : ''}
                          class="delivery-option-input
                            js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                          name="delivery-option-${matchingProduct.id}">
                        <div>
                          <div class="delivery-option-date">
                            ${dateString}
                          </div>
                          <div class="delivery-option-price">
                            ${priceString} Shipping
                          </div>
                          </div>
                        </div>
          `
          })

              return html;
        }

   document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        removeFromCart(productId);

        renderCheckoutHeader()
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

      renderCheckoutHeader()
      renderOrderSummary();
      renderPaymentSummary()
    }


       //firstly we loop through our input element and add an event listener so when we clicked it, it carries out a function

       document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {

          element.addEventListener('click', () => {

             //const productId = element.dataset.productId;
             //const deliveryOptionId = element.dataset. deliveryOptionId;

            const { productId, deliveryOptionId } = element.dataset;

            updateDeliveryOption(productId, deliveryOptionId);

            renderOrderSummary();
            renderPaymentSummary();
          });

  });

}

