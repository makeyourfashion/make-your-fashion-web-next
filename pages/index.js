import { Provider } from 'mobx-react';
import Head from '../components/Head';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import initProductDetailStore from '../stores/productDetail';
import LandingView from '../components/landing';

const Landing = () => (
  <div>
    <Head />
    <Provider
      cartStore={initCartStore()}
      identityStore={initIdentityStore()}
      productDetailStore={initProductDetailStore()}
    >
      <LandingView />
    </Provider>
  </div>
);

export default Landing;
