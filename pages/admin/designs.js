import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../../components/Head';
import initIdentityStore from '../../stores/identity';
import DesignsView from '../../components/admin/designs';
import initCartStore from '../../stores/cart';
import initProductDetailStore from '../../stores/productDetail';

function Designs() {
  return (
    <div>
      <Head />
      <Provider
        identityStore={initIdentityStore()}
        cartStore={initCartStore()}
        productDetailStore={initProductDetailStore()}
      >
        <DesignsView />
      </Provider>
    </div>
  );
}

export default Designs;
