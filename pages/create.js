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
    if (query.product) {
      await productStore.fetchProduct(query.product);
    }
    return {
      products: productStore.products,
      productId: query.product,
      cartId: query.cart,
      userAgent,
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
          <CreateView userAgent={this.props.userAgent} productId={this.props.productId} cartId={this.props.cartId} />
        </Provider>
      </div>
    );
  }
}
