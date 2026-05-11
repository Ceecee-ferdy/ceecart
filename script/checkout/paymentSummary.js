import { cart, calculateCartQuantity } from '../../data/cart.js';
import { getDeliveryOption  } from '../../data/deliveryOptions.js';
import { products } from '../../data/products.js';
import { addOrder } from '../../data/orders.js';

renderPaymentSummary()

export function renderPaymentSummary() {
   let productPriceCents = 0;
   let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
   const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if(product.id === productId) {
        matchingProduct = product
      }
    })

    //multiply the product price and quantity

    matchingProduct.priceCents * cartItem.quantity;

    //lastly add everything together

    productPriceCents += matchingProduct.priceCents * cartItem.quantity

    // to get the shipping fee;

     const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
     shippingPriceCents += deliveryOption.priceCents
  })

    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;

    const totalCents = totalBeforeTaxCents + taxCents;

  // we generate our html
    const paymentSummaryHTML = `

    <div class="payment-summary-title">
      Order Summary
    </div>

     <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">
              $${(productPriceCents / 100).toFixed(2)}
            </div>
          </div>

          
          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-shipping">
              $${(shippingPriceCents / 100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
             $${(totalBeforeTaxCents / 100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
             $${(taxCents / 100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-summary-total">
              $${(totalCents / 100).toFixed(2)}
            </div>
          </div>     

    </div> 
   
    <div class="payment-summary-divider"></div>


     <button class="place-order-button button-primary
             js-place-order
          ">
            Place your order
          </button>

`;


       //next we put the html on the page using the dom

    document.querySelector('.js-payment-summary')
     .innerHTML = paymentSummaryHTML


     document.querySelector('.js-place-order')
      .addEventListener('click', async () => {
        if (cart.length === 0) {

        const messageContainer = document.querySelector('.js-empty-cart-message');

        messageContainer.innerHTML = `
          <div class="empty-cart-alert">
            Your cart is empty.
          </div>
        `;

        setTimeout(() => {
          messageContainer.innerHTML = '';
        }, 2500);

        return;
      }

        try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();

        addOrder(order);

      } catch(error) {
        console.log('Unexpected error. Try again later.')
      }

       window.location.href = 'orders.html';
      });
}

