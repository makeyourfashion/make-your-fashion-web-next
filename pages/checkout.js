import React from 'react';
import { Provider } from 'mobx-react';
import Router from 'next/router';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import CheckoutView from '../components/checkout';
import initProductStore from '../stores/product';

export default class Landing extends React.Component {
  static async getInitialProps() {
    const identityStore = initIdentityStore();
    await identityStore.initSession();
    const { id, phone, name, address, email } = identityStore;
    return {
      id,
      phone,
      name,
      address,
      email,
    };
  }

  constructor(props) {
    super(props);
    const { id, phone, name, address, email } = this.props;
    this.identityStore = initIdentityStore([], {
      id,
      phone,
      name,
      address,
      email,
    });
  }

  componentDidMount() {
    if (!this.identityStore.isLoggedIn) {
      Router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
    }
  }

  render() {
    return (
      <div>
        <Provider
          cartStore={initCartStore()}
          identityStore={this.identityStore}
          productStore={initProductStore()}
        >
          <CheckoutView />
        </Provider>
      </div>
    );
  }
}
