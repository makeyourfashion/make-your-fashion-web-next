import { action } from 'mobx';
import Router from 'next/router';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import initPictureStore from '../stores/picture';

const cartStore = initCartStore();
const identityStore = initIdentityStore();
const pictureStore = initPictureStore();

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
  else
      byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], {type:mimeString});
}

export const placeOrder = action(async (order, onSuccess) => {
  await order.orderItem.map(item => item.images.map(async (img) => {
    const design = img.design;
    const imgUrl = design.img_url;
    if (imgUrl.startsWith('data')) {
      const file = dataURItoBlob(imgUrl);
      const pic = await pictureStore.uploadImage({
        file,
        tag: '',
      });
      design.img_url = pic.imgUrl;
    }

    return null;
  }));
  const res = await fetch('/api/orders', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
  if (res.status === 201) {
    onSuccess();
    identityStore.histories = [];
    cartStore.clearCart();
    window.setTimeout(() => {
      Router.push('/account/history');
    }, 4000);
  }
});
