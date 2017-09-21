import React from 'react';
import { Provider } from 'mobx-react';
import 'es6-promise';
import initProductStore from '../stores/product';
import initCartStore from '../stores/cart';
import ShopView from '../components/shop';
import initIdentityStore from '../stores/identity';

function fetch(productStore, query) {
  return productStore.fetchCategories().then(() => productStore.fetchCampaigns().then(() => {
    if (query.campaign) {
      return productStore.fetchProcutsByCampaign(query.campaign);
    } else if (query.category) {
      return productStore.fetchProcutsByCategory(query.category);
    }
    return productStore.fetchAllProducts(query.category);
  }));
}

export default class Shop extends React.Component {
  static async getInitialProps({ query, req }) {
    const productStore = initProductStore();
    if (req) {
      await fetch(productStore, query);
    } else {
      fetch(productStore, query);
    }

    return {
      categories: productStore.categories,
      campaigns: productStore.campaigns,
      products: productStore.products,
      category: query.category || 'all',
      campaign: query.campaign,
      tag: query.tag,
    };
  }

  productStore = initProductStore({
    products: this.props.products,
    categories: this.props.categories,
    campaigns: this.props.campaigns,
  })

  render() {
    return (
      <div>
        <Provider
          cartStore={initCartStore()}
          productStore={this.productStore}
          identityStore={initIdentityStore()}
        >
          <ShopView category={this.props.category} campaign={this.props.campaign} />
        </Provider>
      </div>
    );
  }
}
