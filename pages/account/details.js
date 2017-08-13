import React from 'react';
import { Provider } from 'mobx-react';
import initCartStore from '../../stores/cart';
import initIdentityStore from '../../stores/identity';
import DetailsView from '../../components/account/details';
import initProductStore from '../../stores/product';

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
        <Provider
          cartStore={initCartStore()}
          identityStore={this.identityStore}
          productStore={initProductStore()}
        >
          <DetailsView />
        </Provider>
      </div>
    );
  }
}
