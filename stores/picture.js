import { observable, computed } from 'mobx';
import { flatten } from 'lodash';
import 'isomorphic-fetch';

let store = null;
class PictureStore {
  @observable picturesByTag = []
  @observable isLoading = false;
  @observable error = null;

  constructor() {
    this.init();
  }

  @computed get allDesigns() {
    return flatten(this.picturesByTag.map(pics => pics.designs.slice()));
  }

  @computed get allTags() {
    return this.picturesByTag.map((id, name) => ({ id, name }));
  }

  getPicturesByTag(tagId) {
    return this.picturesByTag.find(byTag => byTag.id === tagId).designs;
  }

  getPicture(id) {
    console.log(id, this.allDesigns)
    return this.allDesigns.find(pic => +pic.id === +id);
  }

  async init() {
    if (typeof window !== 'undefined') {
      this.isLoading = true;
      try {
        const res = await fetch('/api/designs');
        this.picturesByTag = await res.json();
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
