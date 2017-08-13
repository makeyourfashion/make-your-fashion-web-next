import React from 'react';
import { Provider } from 'mobx-react';
import initIdentityStore from '../../stores/identity';
import DesignsView from '../../components/admin/designs';
import initCartStore from '../../stores/cart';
import initProductStore from '../../stores/product';
import initPictureStore from '../../stores/picture';

export default class Designs extends React.Component {
  componentDidMount() {
    this.pictureStore.init();
  }

  pictureStore = initPictureStore()

  render() {
    return (
      <div>
        <Provider
          cartStore={initCartStore()}
          identityStore={initIdentityStore()}
          productStore={initProductStore()}
          pictureStore={this.pictureStore}
        >
          <DesignsView />
        </Provider>
      </div>
    );
  }
}
