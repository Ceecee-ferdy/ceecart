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
     
      <div class="product-container js-product-container">

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

       <div class="product-quantity-container js-product-quantity-container">
           <select class="js-quantity-select">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

       <button class="add-button js-add-button" data-product-id="${product.id}">
        <span class="button-text">
          Add to Cart
        </span>
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

          // 👇 find the correct container for THIS button
          const productContainer = button.closest('.js-product-container');
        
         const quantity = Number(productContainer.querySelector('.js-quantity-select').value);

         addToCart(productId, quantity);

          updateCartQuantity();

          button.classList.add('added');

          button.innerHTML = `
            <span class="button-text">
              ✓ Added
            </span>
          `;

          setTimeout(() => {
            button.classList.remove('added');

            button.innerHTML = `
              <span class="button-text">
                Add to Cart
              </span>
            `;
          }, 1200);
        });
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



          const searchInput = document.querySelector('.js-search-bar');
          const suggestionsContainer = document.querySelector('.js-search-suggestions');

          if (suggestionsContainer) {
      searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase().trim();

        if (!value) {
          suggestionsContainer.innerHTML = '';
          return;
        }

       const matches = products.filter((product) => {
        const nameMatch = product.name.toLowerCase().includes(value);

        const keywordMatch = product.keywords.some((keyword) =>
          keyword.toLowerCase().includes(value)
        );

        return nameMatch || keywordMatch;
      });

        let suggestionsHTML = '';

        matches.slice(0, 5).forEach((product) => {
          suggestionsHTML += `
            <div class="search-suggestion-item" data-name="${product.name}">
              ${product.name}
            </div>
          `;
        });

        suggestionsContainer.innerHTML = suggestionsHTML;
      });

      suggestionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('search-suggestion-item')) {
          const name = e.target.dataset.name;
          window.location.href = `index.html?search=${name}`;
        }
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.ceecart-header-middle-section')) {
          suggestionsContainer.innerHTML = '';
        }
      });
}





