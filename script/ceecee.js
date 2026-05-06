import { products } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cart.js"

renderProducts()

function renderProducts() {
  let productsHTML = '';


   const url = new URL(window.location.href);
   const search = url.searchParams.get('search');
   if (search) {
   document.querySelector('.js-search-bar').value = search;
 }

    let filteredProducts = products;

     //if a search exists in the url parameters, filter the products that match the search

    if(search) {
      filteredProducts = products.filter((product) => {
        
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if(keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      })
       return matchingKeyword ||
          product.name.toLowerCase().includes(search.toLowerCase())
    })
  }

   if (filteredProducts.length === 0) {
     productsHTML = `
   <div class="no-products-message">
    <p>No products found for "<strong>${search}</strong>"</p>
    <button class="button-soft js-reset-search">Show all products</button>
   </div>
 `;
   }

     filteredProducts.forEach((product) => {
       productsHTML += `
     
      <div class="product-container">

      <a href="product.html?id=${product.id}" class="product-link">
      <div class="product-image-container">
       <img src="${product.image}" class="product-image">
      </div>

      <div class="product-name">
        ${product.name}
      </div>
      </a>

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
      });


          
}

          document.querySelector('.js-search-button')
          .addEventListener('click', () => {
            const search = document.querySelector('.js-search-bar').value;

            if (!search) return;

            window.location.href = `index.html?search=${search}`;
          });


             // make work using enter key;
             // we can also put our codes in a function and re-use them

            document.querySelector('.js-search-bar')
            .addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                  const search = document.querySelector('.js-search-bar').value;

                  if (!search) return;

                  window.location.href = `index.html?search=${search}`;
                }
              });

              document.addEventListener('click', (e) => {
                if (e.target.classList.contains('js-reset-search')) {
                  window.location.href = 'index.html';
                }
              });

