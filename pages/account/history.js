import React from 'react';
import { Provider } from 'mobx-react';
import initCartStore from '../../stores/cart';
import initIdentityStore from '../../stores/identity';
import HistoryView from '../../components/account/history';
import initProductStore from '../../stores/product';

export default class History extends React.Component {
  componentDidMount() {
    this.identityStore.fetchHistories();
  }

  identityStore = initIdentityStore()

  render() {
    return (
      <div>
        <Provider
          cartStore={initCartStore()}
          identityStore={this.identityStore}
          productStore={initProductStore()}
        >
          <HistoryView />
        </Provider>
      </div>
    );
  }
}
