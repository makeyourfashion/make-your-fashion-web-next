import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../../components/Head';
import initCartStore from '../../stores/cart';
import initIdentityStore from '../../stores/identity';
import DetailsView from '../../components/account/details';
import initProductDetailStore from '../../stores/productDetail';

export default class History extends React.Component {
  static async getInitialProps() {
    const identityStore = initIdentityStore();
    await identityStore.fetchHistories();
    return {
      histories: identityStore.histories.slice(),
    };
  }

  identityStore = initIdentityStore(this.props.histories)

  render() {
    return (
      <div>
        <Head />
        <Provider
          cartStore={initCartStore()}
          identityStore={this.identityStore}
          productDetailStore={initProductDetailStore()}
        >
          <DetailsView />
        </Provider>
      </div>
    );
  }
}
