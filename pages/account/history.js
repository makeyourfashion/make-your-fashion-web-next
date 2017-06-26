import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../../components/Head';
import initCartStore from '../../stores/cart';
import initIdentityStore from '../../stores/identity';
import HistoryView from '../../components/account/history';
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
          <HistoryView />
        </Provider>
      </div>
    );
  }
}
