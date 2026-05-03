import { products } from '../data/products.js';

const url = new URL(window.location.href);
const productId = url.searchParams.get('id');

let matchingProduct;

products.forEach((product) => {
  if (product.id === productId) {
    matchingProduct = product;
  }
});

let productHTML = '';

if (matchingProduct) {
 productHTML = `
  <div class="product-details-container">

    <img src="${matchingProduct.image}" class="product-image">

    <div class="product-details-info">
      <h1 class="product-details-title">
        ${matchingProduct.name}
      </h1>

      <p class="product-details-price">
        $${(matchingProduct.priceCents / 100).toFixed(2)}
      </p>

      <button class="product-details-button">
        Add to Cart
      </button>
    </div>

    </div>
  `;
}

document.querySelector('.js-product-details').innerHTML = productHTML;