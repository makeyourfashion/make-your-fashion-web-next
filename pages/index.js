import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../components/Head';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import initProductStore from '../stores/product';
import initPictureStore from '../stores/picture';
import LandingView from '../components/landing';

export default class Landing extends React.Component {
  static async getInitialProps() {
    const productStore = initProductStore();
    await productStore.fetchCampaigns();
    return {
      campaigns: productStore.campaigns,
    };
  }

  constructor(props) {
    super(props);
    this.productStore = initProductStore({
      campaigns: this.props.campaigns,
    });
  }

  render() {
    return (
      <div>
        <Head />
        <Provider
          cartStore={initCartStore()}
          identityStore={initIdentityStore()}
          pictureStore={initPictureStore()}
          productStore={this.productStore}
        >
          <LandingView />
        </Provider>
      </div>
    );
  }
}
