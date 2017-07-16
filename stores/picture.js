import { action, observable, computed } from 'mobx';
import { keyBy } from 'lodash';
import 'isomorphic-fetch';

let store = null;
class PictureStore {
  @observable designs = observable.map();
  @observable tags = observable.map();
  @observable error = null;

  @computed get allDesigns() {
    return this.designs.values();
  }

  @computed get allTags() {
    return this.tags.values();
  }

  getPicturesByTag(tagId) {
    if (+tagId === 0) {
      return this.allDesigns;
    }
    const ids = this.tags.get(tagId).designs;
    if (ids) {
      return ids.map(id => this.designs.get(id));
    } else {
      return [];
    }
  }

  getPicture(id) {
    return this.allDesigns.find(pic => +pic.id === +id);
  }

  @action async fetchPictures(tagId) {
    if (this.getPicturesByTag(tagId).length) {
      return;
    }
    this.isLoading = true;
    try {
      const res = await fetch(`/api/designs?tag=${tagId}`, {
        credentials: 'include',
      });
      const obj = await res.json();
      this.designs.merge(keyBy(obj.designs, 'id'));
      this.tags.get(tagId).designs = obj.designs.map(d => d.id);
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }
  @action async uploadImage(newDesign) {
    this.isLoading = true;
    const fd = new FormData();
    const { file, tag } = newDesign;
    fd.append('image', file);
    fd.append('tag', tag);
    try {
      const res = await fetch('/api/designs', {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      const obj = await res.json();
      this.designs.set(obj.id, obj);
      this.error = null;
    } catch (e) {
      this.error = 'server error';
    }

    this.isLoading = false;
  }

  @action async init() {
    if (typeof window !== 'undefined') {
      this.isLoading = true;
      try {
        const res = await fetch('/api/designs');
        const obj = await res.json();
        this.designs.merge(keyBy(obj.designs, 'id'));
        this.tags.merge(keyBy(obj.tags, 'id'));
        this.error = null;
      } catch (e) {
        this.error = 'server error';
      }

      this.isLoading = false;
    }
  }
}

export default function init() {
  if (store === null || typeof window === 'undefined') {
    store = new PictureStore();
  }
  return store;
}
