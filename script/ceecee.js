import { products } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js"

renderProducts()

function renderProducts() {
  let productsHTML = '';

  products.forEach((product, index) => {
    productsHTML += `
      <div class="product-container">

      <div class="product-image-container">
       <img src="${product.image}" class="product-image">
      </div>

      <div class="product-name">
        ${product.name}
      </div>

      <div class="product-price">
       $${((product.priceCents) / 100).toFixed(2)}
      </div>

       <button class="add-button js-add-button" data-product-id="${product.id}">
        Add to Cart
        </button>

     </div>  
      `
  })

     document.querySelector('.js-products-grid')
     .innerHTML = productsHTML;

     function updateCartQuantity() {
      const cartQuantity = calculateCartQuantity();

      document.querySelector('.js-cart-quantity')
       .innerHTML = cartQuantity || 0
     }
       updateCartQuantity();

     document.querySelectorAll('.js-add-button')
      .forEach((button) => {
        button.addEventListener('click', () => {
          const productId = button.dataset.productId;

          addToCart(productId);

          updateCartQuantity();
        })
      })
}