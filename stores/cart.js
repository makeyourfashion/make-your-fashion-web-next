import { observable, action } from 'mobx';

let store = null;
class CartStore {
  @observable cartItems = []

  constructor() {
    if (typeof window !== 'undefined') {
      const cartJson = window.localStorage.getItem('cart');
      if (cartJson) {
        this.cartItems = JSON.parse(cartJson);
      }
    }
  }

  getCartItem(id) {
    return this.cartItems.slice().find(item => +id === item.id);
  }

  @action addCartItem(item) {
    this.cartItems.push({
      ...item,
      id: new Date().getTime(),
    });
    window.localStorage.setItem('cart', JSON.stringify(this.cartItems.slice()));
  }

  @action clearCart() {
    this.cartItems = [];
    window.localStorage.setItem('cart', JSON.stringify(this.cartItems.slice()));
  }
}

export default function init() {
  if (store === null || typeof window === 'undefined') {
    store = new CartStore();
  }
  return store;
}
