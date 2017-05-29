import { observable, action } from 'mobx';
import { flatten } from 'lodash';
import 'isomorphic-fetch';
import { getProductsByCatalog, getCatalog } from '../baseWebClient';

let store = null;
const intialState = { products: {}, categories: [] };
class ProductStore {
  @observable products = {}
  @observable categories = {}
  @observable isLoading = false

  constructor(state = intialState) {
    this.products = state.products;
    this.categories = state.categories;
    this.isServer = typeof window === 'undefined';
  }

  @action
  async fetchCategories() {
    if (this.categories.length) {
      return;
    }
    this.isLoading = true;
    try {
      if (this.isServer) {
        this.categories = await getCatalog(1);
      } else {
        const res = await fetch('/api/category', {
          credentials: 'same-origin',
        });
        this.categories = await res.json();
      }
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  @action
  async fetchProcuts(categoryId) {
    if (this.products[categoryId]) {
      return;
    }
    this.isLoading = true;
    try {
      if (this.isServer) {
        this.products[categoryId] = await getProductsByCatalog(categoryId);
      } else {
        const res = await fetch(`/api/category/${categoryId}`, {
          credentials: 'same-origin',
        });
        this.products[categoryId] = await res.json();
      }
    } catch (e) {
      // do nothing
    }

    this.isLoading = false;
  }

  getProductsByCategory(id, subCatId) {
    if (!subCatId) {
      return flatten(this.products[id].slice().map(c => c.products.slice()));
    }
    return this.products[id].slice().find(subCat => subCat.id === +subCatId).products;
  }

  getSubCategories(categoryId) {
    return this.products[categoryId].slice().map(({ name, id }) => ({ name, id }));
  }

  getCategory(id) {
    return this.categories.slice().find(c => c.id === +id);
  }
}

export default function init(initialState) {
  if (store === null || typeof window === 'undefined') {
    store = new ProductStore(initialState);
  }
  return store;
}
