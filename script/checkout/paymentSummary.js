import { cart, calculateCartQuantity } from '../../data/cart.js';
import { products } from '../../data/products.js'

renderPaymentSummary()

export function renderPaymentSummary() {

  let productPriceCents = 0;

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
  })

  // we generate our html
    const paymentSummaryHTML = `

    <div class="payment-summary-title">
      Order Summary
    </div>

     <div class="payment-summary-row">
      <div>Items:</div>
      <div class="payment-summary-money">
         ${calculateCartQuantity()} Items
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Subtotal:</div>
      <div class="payment-summary-money">
        $${(productPriceCents / 100).toFixed(2)}
      </div>
    </div> 
   
    <div class="payment-summary-divider"></div>

    <div class="payment-summary-row total-row">
      <div>Order Total:</div>
      <div class="payment-summary-money">
        $${(productPriceCents / 100).toFixed(2)}
      </div>
    </div>

     <button class="place-order-button button-primary
             js-place-order
          ">
            Place your order
          </button>

`;


     document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHTML;
}