import React from 'react';
import { Provider } from 'mobx-react';
import 'es6-promise';
import Head from '../components/Head';
import initProductStore from '../stores/product';
import initCartStore from '../stores/cart';
import ShopView from '../components/shop';
import initIdentityStore from '../stores/identity';

export default class Shop extends React.Component {
  static async getInitialProps({ query }) {
    const productStore = initProductStore();
    await productStore.fetchCategories();
    await productStore.fetchCampaigns();
    if (query.category) {
      await productStore.fetchProcutsByCategory(query.category);
    } else {
      await productStore.fetchProcutsByCampaign(query.campaign);
    }

    return {
      categories: productStore.categories,
      campaigns: productStore.campaigns,
      products: productStore.products,
      category: query.category,
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
        <Head />
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
