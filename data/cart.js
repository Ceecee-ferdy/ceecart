export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
 localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
  let matchingItem;

 cart.forEach((item) => {
  if(item.productId === productId) {
    matchingItem = item;
  }
 })

  if(matchingItem){
    matchingItem.quantity += 1
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    })
  }

  saveToStorage()
}

export function removeFromCart(productId) {
  const newCart = []

  cart.forEach((item) => {
    if(item.productId !== productId) {
      newCart.push(item);
    }
  })
    cart = newCart;

    saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity
  });
   return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((item) => {
    if(item.productId === productId) {
      matchingItem = item
    }
  })

  matchingItem.quantity = newQuantity;

  saveToStorage()
}




