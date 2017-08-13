import React from 'react';
import { Provider } from 'mobx-react';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import CartView from '../components/cart';
import initProductStore from '../stores/product';

function Cart({ redirect }) {
  return (
    <div>
      <Provider
        cartStore={initCartStore()}
        identityStore={initIdentityStore()}
        productStore={initProductStore()}
      >
        <CartView redirect={redirect} />
      </Provider>
    </div>
  );
}

export default Cart;
