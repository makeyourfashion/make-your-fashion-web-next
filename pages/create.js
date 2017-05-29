import React from 'react';
import { Provider } from 'mobx-react';
import Head from '../components/Head';
import initProductDetailStore from '../stores/productDetail';
import initProductStore from '../stores/product';
import initCartStore from '../stores/cart';
import CreateView from '../components/create';
import initIdentityStore from '../stores/identity';
import initDesignStore from '../stores/design';
import initPictureStore from '../stores/picture';


export default class Create extends React.Component {
  static async getInitialProps({ query }) {
    const productDetailStore = initProductDetailStore();
    await productDetailStore.fetchProductDetail(query.product);
    return {
      productDetails: productDetailStore.productDetails,
      productId: query.product,
    };
  }

  productDetailStore = initProductDetailStore(this.props.productDetails)
  designStore = initDesignStore(this.props.productId)

  render() {
    return (
      <div>
        <Head />
        <Provider
          cartStore={initCartStore()}
          identityStore={initIdentityStore()}
          productDetailStore={this.productDetailStore}
          productStore={initProductStore()}
          designStore={this.designStore}
          pictureStore={initPictureStore()}
        >
          <CreateView productId={this.props.productId} />
        </Provider>
      </div>
    );
  }
}
