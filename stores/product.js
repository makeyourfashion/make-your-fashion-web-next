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
      name: '鲁能是冠军',
      img: 'http://img.lnts.cn/attachments/default/201706/20/g0E09t4caebae90249aa2c040e56326420ec43.jpg',
    },
    {
      id: 1,
      name: '联赛',
      img: 'http://www.lnts.com.cn/themes/classic/statics/images/upload/home/all/2016.jpg',
    },
    {
      id: 2,
      name: '杯赛',
      img: 'http://img.lnts.cn/attachments/default/201706/23/E62jNbdba0ea5c127809a2c423ce47ceee80b5.jpg',
    },
  ]
  @observable productsByTags = observable.map({
    0: [
      {
        id: 100,
        name: '乘风破浪',
        des: '乘风破浪',
        imgUrl: 'https://gw.alicdn.com/bao/uploaded/i3/2935010079/TB2l4IAm88lpuFjy0FnXXcZyXXa_!!2935010079.jpg_230x230.jpg',
        category: 3,
        cost: null,
      },
      {
        id: 101,
        name: 'LNTS',
        des: '鲁能是冠军',
        imgUrl: 'https://img.alicdn.com/bao/uploaded/i4/TB1U7kCLVXXXXaRXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg',
        category: 3,
        cost: null,
      },
    ],
    1: [
      {
        id: 100,
        name: '乘风破浪',
        des: '乘风破浪',
        imgUrl: 'https://gw.alicdn.com/bao/uploaded/i3/2935010079/TB2l4IAm88lpuFjy0FnXXcZyXXa_!!2935010079.jpg_230x230.jpg',
        category: 3,
        cost: null,
      },
      {
        id: 101,
        name: 'LNTS',
        des: '鲁能是冠军',
        imgUrl: 'https://img.alicdn.com/bao/uploaded/i4/TB1U7kCLVXXXXaRXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg',
        category: 3,
        cost: null,
      },
    ],
    2: [
      {
        id: 100,
        name: '乘风破浪',
        des: '乘风破浪',
        imgUrl: 'https://gw.alicdn.com/bao/uploaded/i3/2935010079/TB2l4IAm88lpuFjy0FnXXcZyXXa_!!2935010079.jpg_230x230.jpg',
        category: 3,
        cost: null,
      },
      {
        id: 101,
        name: 'LNTS',
        des: '鲁能是冠军',
        imgUrl: 'https://img.alicdn.com/bao/uploaded/i4/TB1U7kCLVXXXXaRXpXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg',
        category: 3,
        cost: null,
      },
    ],
    3: [],
    4: [],
    5: [],
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
