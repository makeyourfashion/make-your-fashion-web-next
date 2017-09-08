import React from 'react';
import { Provider } from 'mobx-react';
import initProductStore from '../stores/product';
import initCartStore from '../stores/cart';
import CreateView from '../components/create';
import initIdentityStore from '../stores/identity';
import initDesignStore from '../stores/design';
import initPictureStore from '../stores/picture';

export default class Create extends React.Component {
  static async getInitialProps({ query, req }) {
    const productStore = initProductStore();
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    const productId = query.product || '1';
    await productStore.fetchProduct(productId);
    return {
      products: productStore.products,
      productId,
      cartId: query.cart,
      userAgent,
      step: query.product ? 1 : 0,
    };
  }

  constructor(props) {
    super(props);
    this.productStore = initProductStore({
      products: this.props.products,
    });
    this.cartStore = initCartStore();
    if (this.props.cartId) {
      const cartItem = this.cartStore.getCartItem(this.props.cartId);
      if (cartItem) {
        this.designStore = initDesignStore(cartItem.productId, cartItem.designs, cartItem.texts);
        return;
      }
    }
    const designDetail = this.productStore.getProduct(this.props.productId).designDetail;
    const textDetail = this.productStore.getProduct(this.props.productId).textDetail;
    this.designStore = initDesignStore(this.props.productId, designDetail, textDetail);
  }

  componentDidMount() {
    this.pictureStore.init();
  }

  pictureStore= initPictureStore()

  render() {
    return (
      <div>
        <Provider
          cartStore={this.cartStore}
          identityStore={initIdentityStore()}
          productStore={this.productStore}
          designStore={this.designStore}
          pictureStore={this.pictureStore}
        >
          <CreateView step={this.props.step} userAgent={this.props.userAgent} productId={this.props.productId} cartId={this.props.cartId} />
        </Provider>
      </div>
    );
  }
}
