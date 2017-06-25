import React from 'react';
import { Provider } from 'mobx-react';
import 'es6-promise';
import Head from '../components/Head';
import initProductStore from '../stores/product';
import initCartStore from '../stores/cart';
import ShopView from '../components/shop';
import initIdentityStore from '../stores/identity';
import initProductDetailStore from '../stores/productDetail';

export default class Shop extends React.Component {
  static async getInitialProps({ query }) {
    const productStore = initProductStore();
    await Promise.all([productStore.fetchProcuts(query.category), productStore.fetchCategories()]);
    return {
      categories: productStore.categories,
      products: productStore.products,
      category: query.category,
      tag: query.tag,
    };
  }

  productStore = initProductStore({
    products: this.props.products,
    categories: this.props.categories,
  })

  render() {
    return (
      <div>
        <Head />
        <Provider
          cartStore={initCartStore()}
          productStore={this.productStore}
          identityStore={initIdentityStore()}
          productDetailStore={initProductDetailStore()}
        >
          <ShopView category={this.props.category} tag={this.props.tag} />
        </Provider>
      </div>
    );
  }
}
