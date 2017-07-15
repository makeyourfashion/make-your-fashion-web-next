import { action } from 'mobx';
import Router from 'next/router';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';

const cartStore = initCartStore();
const identityStore = initIdentityStore();

export const placeOrder = action(async (order, onSuccess) => {
  const res = await fetch('/api/orders', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (res.status === 201) {
    onSuccess();
    identityStore.histories = [];
    cartStore.clearCart();
    window.setTimeout(() => {
      Router.push('/account/history');
    }, 4000);
  }
});
