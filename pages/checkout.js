import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../components/Head';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import CheckoutView from '../components/checkout';
import initProductStore from '../stores/product';

function Checkout({ redirect }) {
  return (
    <div>
      <Head />
      <Provider
        cartStore={initCartStore()}
        identityStore={initIdentityStore()}
        productStore={initProductStore()}
      >
        <CheckoutView redirect={redirect} />
      </Provider>
    </div>
  );
}

export default Checkout;
