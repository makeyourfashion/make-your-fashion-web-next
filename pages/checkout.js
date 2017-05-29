import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../components/Head';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import CheckoutView from '../components/checkout';
import initProductDetailStore from '../stores/productDetail';

function Checkout({ redirect }) {
  return (
    <div>
      <Head />
      <Provider
        cartStore={initCartStore()}
        identityStore={initIdentityStore()}
        productDetailStore={initProductDetailStore()}
      >
        <CheckoutView redirect={redirect} />
      </Provider>
    </div>
  );
}

export default Checkout;
