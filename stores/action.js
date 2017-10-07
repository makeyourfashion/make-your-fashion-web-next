import { action } from 'mobx';
import Router from 'next/router';
import 'es6-promise';
import flatten from 'lodash/flatten';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import initPictureStore from '../stores/picture';
import { dataURItoBlob } from '../utils';

const cartStore = initCartStore();
const identityStore = initIdentityStore();
const pictureStore = initPictureStore();

export const placeOrder = action(async (order, onSuccess) => {
  await Promise.all(flatten(order.orderItem.map(item => item.images.map((img) => {
    const design = img.design;
    const imgUrl = design.img_url;
    if (imgUrl.startsWith('data')) {
      const file = dataURItoBlob(imgUrl);
      return pictureStore.uploadImage({
        file,
        tag: '',
      }).then((pic) => {
        design.img_url = pic.imgUrl;
      });
    }

    return null;
  })))).then(() => {
    fetch('/api/orders', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }).then((res) => {
      if (res.status === 201) {
        onSuccess();
        identityStore.histories = [];
        cartStore.clearCart();
        window.setTimeout(() => {
          Router.push('/account/history');
        }, 4000);
      }
    });
  });
});
