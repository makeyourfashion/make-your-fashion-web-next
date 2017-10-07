import 'isomorphic-fetch';
import { dataURItoBlob } from '../utils';

export async function removeBackground(imgUrl) {
  const file = dataURItoBlob(imgUrl);
  const data = new FormData();
  data.append('image', file);
  const res = await fetch('/api/image?type=nobackground', {
    method: 'POST',
    credentials: 'include',
    body: data,
  });
  return (await res.json()).file;
}
