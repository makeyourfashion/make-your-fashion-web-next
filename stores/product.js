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
  @observable tags = [
    {
      id: 0,
      name: '父亲节',
    },
    {
      id: 1,
      name: '母亲节',
    },
    {
      id: 2,
      name: 'NBA',
    },
    {
      id: 3,
      name: '神奇女侠',
    },
  ]
  @observable productsByTags = observable.map({
    0: [],
    1: [],
    2: [
      {
        id: 100,
        name: 'stephen curry',
        des: '大幅度辅导费多发点',
        imgUrl: '/static/image/100.png',
        category: 3,
        cost: null,
      },
      {
        id: 101,
        name: 'james harden',
        des: '大幅度辅导费多发点',
        imgUrl: '/static/image/101.png',
        category: 3,
        cost: null,
      },
    ],
    3: [],
  })

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

  getProductByTag(id) {
    return this.productsByTags.get(+id);
  }

  getSubCategories(categoryId) {
    return this.products[categoryId].slice().map(({ name, id }) => ({ name, id }));
  }

  getCategory(id) {
    return this.categories.slice().find(c => c.id === +id);
  }

  getTag(id) {
    return this.tags.slice().find(c => c.id === +id);
  }
}

export default function init(initialState) {
  if (store === null || typeof window === 'undefined') {
    store = new ProductStore(initialState);
  }
  return store;
}
