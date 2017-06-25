import { observable, action } from 'mobx';
import { getSpec } from '../baseWebClient';
import mockProduct from './mock.json';

let store = null;
class ProductDetailStore {
  @observable productDetails = []
  @observable isLoading = []
  @observable error = null

  constructor(productDetails = []) {
    this.isServer = typeof window === 'undefined';
    this.productDetails = [
      ...mockProduct,
      ...productDetails,
    ];
  }

  getProductDetail(id) {
    return this.productDetails.find(detail => +id === detail.id);
  }

  @action async fetchProductDetail(id) {
    if (this.getProductDetail(id)) {
      return;
    }
    this.isLoading = true;
    try {
      if (this.isServer) {
        this.productDetails.push(await getSpec(id));
      } else {
        const res = await fetch(`/api/spec/${id}`, {
          credentials: 'same-origin',
        });
        this.productDetails.push(await res.json());
        this.error = null;
      }
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }
}

export default function init(productDetails) {
  if (store === null || typeof window === 'undefined') {
    store = new ProductDetailStore(productDetails);
  }
  return store;
}
