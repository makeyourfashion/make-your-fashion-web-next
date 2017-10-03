import React from 'react';
import { Provider } from 'mobx-react';
import Router from 'next/router';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import CheckoutView from '../components/checkout';
import initProductStore from '../stores/product';

export default class Checkout extends React.Component {
  state = {
    auth: false,
  }

  async componentDidMount() {
    await this.identityStore.initSession();
    if (!this.identityStore.isLoggedIn) {
      Router.push(`/login?redirect=${encodeURIComponent('/admin/designs')}`);
      return;
    }
    this.setState({
      auth: true,
    });
  }

  identityStore = initIdentityStore([]);

  render() {
    return this.state.auth ? (
      <div>
        <Provider
          cartStore={initCartStore()}
          identityStore={this.identityStore}
          productStore={initProductStore()}
        >
          <CheckoutView />
        </Provider>
      </div>
    ) : null;
  }
}
