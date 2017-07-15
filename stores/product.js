import { observable, action } from 'mobx';
import 'isomorphic-fetch';
import { keyBy } from 'lodash';
import { HOST } from '../utils';

let store = null;
const intialState = { products: {}, categories: [] };
class ProductStore {
  @observable products = observable.map()
  @observable categories = observable.map({
    all: {
      products: [],
    },
  })
  @observable campaigns = observable.map()
  @observable isLoading = false

  constructor(state = intialState) {
    this.products = this.products.merge(state.products);
    this.categories = this.categories.merge(state.categories);
    this.campaigns = this.campaigns.merge(state.campaigns);
  }

  @action async fetchCategories() {
    if (this.categories.values().length > 1) {
      return;
    }
    this.isLoading = true;
    try {
      const res = await fetch(`${HOST}api/categories`, {
        credentials: 'same-origin',
      });
      const categories = (await res.json()).categories;
      this.categories.merge(keyBy(categories, 'id'));
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  @action async fetchCampaigns() {
    if (this.campaigns.values().length) {
      return;
    }
    this.isLoading = true;
    try {
      const res = await fetch(`${HOST}api/campaigns`, {
        credentials: 'same-origin',
      });
      const campaigns = (await res.json()).campaigns;
      this.campaigns.merge(keyBy(campaigns, 'id'));
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  @action async fetchAllProducts() {
    const allProducts = this.categories.get('all');
    if (allProducts.products.length) {
      return;
    }
    this.isLoading = true;

    try {
      const res = await fetch(`${HOST}api/products`, {
        credentials: 'same-origin',
      });
      const products = (await res.json()).products;

      this.products.merge(keyBy(products, 'id'));
      const ids = products.map(p => p.id);
      allProducts.products = ids;
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  @action async fetchProcutsByCategory(categoryId) {
    const category = this.categories.get(categoryId);
    if (category && category.products && category.products.length) {
      return;
    }
    this.isLoading = true;

    try {
      const res = await fetch(`${HOST}api/products?catagory=${categoryId}`, {
        credentials: 'same-origin',
      });

      const products = (await res.json()).products;
      this.products.merge(keyBy(products, 'id'));
      const ids = products.map(p => p.id);
      category.products = ids;
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  @action async fetchProcutsByCampaign(campaignId) {
    const campaign = this.campaigns.get(campaignId);
    if (campaign.products && campaign.products.length) {
      return;
    }
    this.isLoading = true;

    try {
      const res = await fetch(`${HOST}api/products?campaign=${campaignId}`, {
        credentials: 'same-origin',
      });
      const products = (await res.json()).products;
      const ids = products.map(p => p.id);
      campaign.products = ids;

      this.products.merge(keyBy(products, 'id'));
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  @action async fetchProduct(id) {
    this.isLoading = true;
    try {
      const res = await fetch(`${HOST}api/products/${id}`, {
        credentials: 'same-origin',
      });
      this.products.set(id, await res.json());
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  getCategory(id) {
    return this.categories.get(+id);
  }

  getCampaign(id) {
    return this.campaigns.get(+id);
  }

  getProduct(id) {
    return this.products.get(id);
  }

  getProductsByCategory(id) {
    return this.categories.get(id).products.map(pid => this.products.get(pid));
  }

  getProductsByCampaign(id) {
    return this.campaigns.get(id).products.map(pid => this.products.get(pid));
  }
}

export default function init(initialState) {
  if (store === null || typeof window === 'undefined') {
    store = new ProductStore(initialState);
  }
  return store;
}
