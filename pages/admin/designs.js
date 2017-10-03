import React from 'react';
import { Provider } from 'mobx-react';
import Router from 'next/router';
import initIdentityStore from '../../stores/identity';
import DesignsView from '../../components/admin/designs';
import initCartStore from '../../stores/cart';
import initProductStore from '../../stores/product';
import initPictureStore from '../../stores/picture';

export default class Designs extends React.Component {
  state = {
    auth: false,
  }
  async componentDidMount() {
    this.pictureStore.init();
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
  pictureStore = initPictureStore()

  render() {
    return this.state.auth ? (
      <div>
        <Provider
          cartStore={initCartStore()}
          identityStore={this.identityStore}
          productStore={initProductStore()}
          pictureStore={this.pictureStore}
        >
          <DesignsView />
        </Provider>
      </div>
    ) : null;
  }
}
