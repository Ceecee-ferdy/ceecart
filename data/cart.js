import { validDeliveryOption } from "./deliveryOptions.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
 localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId,  quantity) {
  let matchingItem;

 cart.forEach((item) => {
  if(item.productId === productId) {
    matchingItem = item;
  }
 })

  if(matchingItem){
    matchingItem.quantity += Number(quantity);
  } else {
   cart.push({
    productId,
    quantity: quantity,
    deliveryOptionId: '1'
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

 export function updateDeliveryOption(productId, deliveryOptionId) {
                 //we will be needing the product and the deliveryoptionid, reason for the parameter

                 //then we loop through our cart and find the product
                 // and then we update the deliveryOptionId of that product

                 let matchingItem;

                 cart.forEach((cartItem) => {
                  if(productId === cartItem.productId) {
                    matchingItem = cartItem
                  }
                 });

                 if(!matchingItem) {
                  return;
                 };

                 if(!validDeliveryOption(deliveryOptionId)) {
                  return;
                 }

                 // each cart item has a property called deliveryOptionId
                  //matchingItem = if the cartitem matches with the productid
                 matchingItem.deliveryOptionId = deliveryOptionId

                 //lastly because we updated the cart we should save to localStorage

                   saveToStorage();

                }




      

     




