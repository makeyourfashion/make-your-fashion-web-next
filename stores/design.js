import { observable, action, computed, autorun } from 'mobx';
import uuid from 'uuid/v4';

let store = null;
class DesignStore {
  @observable design = {
    productId: null,
    images: [],
    texts: [],
  }
  @observable activeImageId = null
  @observable activeTextId = null;
  @observable showEditText = false;

  constructor(productId, images = [], texts = []) {
    this.design.productId = productId;
    if (typeof window !== 'undefined') {
      if (images.length || texts.length) {
        this.design.images = images;
        this.design.texts = texts;
        window.localStorage.setItem('design', JSON.stringify(this.design));
      } else {
        const designJson = window.localStorage.getItem('design');
        if (designJson) {
          const originalDesign = JSON.parse(designJson);
          if (originalDesign.productId === this.design.productId) {
            this.design = originalDesign;
          } else {
            window.localStorage.setItem('design', JSON.stringify(this.design));
          }
        }
      }
    }
    autorun(() => {
      this.activeTextId = this.design.texts[0] && this.design.texts[0].id;
    });
  }

  getText(id) {
    return this.design.texts.find(text => text.id === id);
  }

  getImage(id) {
    return this.design.images.find(image => image.id === id);
  }

  @computed get activeImages() {
    return this.design.images.slice().filter(image => image.picId === this.activeImageId);
  }

  @computed get activeTexts() {
    return this.design.texts.slice().filter(text => text.picId === this.activeImageId);
  }

  @computed get selectedText() {
    return this.design.texts.slice().find(text => text.id === this.activeTextId);
  }

  @action setActiveImageId(id) {
    this.activeImageId = +id;
  }

  @action setActiveTextId(id) {
    this.activeTextId = id;
    this.showEditText = new Date().getTime();
  }

  @action updateImage(image) {
    Object.assign(this.getImage(image.id), image);
    window.localStorage.setItem('design', JSON.stringify(this.design));
  }

  @action updateText(text) {
    Object.assign(this.getText(text.id), text);
    window.localStorage.setItem('design', JSON.stringify(this.design));
  }

  @action removePicture(id) {
    this.design.images = this.design.images.filter(image => image.id !== id);
    window.localStorage.setItem('design', JSON.stringify(this.design));
  }

  @action removeText(id) {
    this.design.texts = this.design.texts.filter(text => text.id !== id);
    window.localStorage.setItem('design', JSON.stringify(this.design));
  }

  @action addImage(imageId, imgUrl) {
    const newImage = {
      id: uuid(),
      imgUrl,
      imageId,
      height: 500,
      width: 500,
      x: 250,
      y: 625,
      rotation: 0,
      picId: this.activeImageId,
    };
    this.design.images.push(newImage);
    window.localStorage.setItem('design', JSON.stringify(this.design));
  }

  @action addText(text) {
    const newText = {
      ...text,
      id: uuid(),
      width: 950,
      x: 25,
      y: 625,
      rotation: 0,
      fontSize: 30,
      fontFamily: 'Arial',
      color: '#000',
      align: 'center',
      bold: false,
      italic: false,
      picId: this.activeImageId,
    };
    this.design.texts.push(newText);
    this.activeTextId = newText.id;
    this.showEditText = new Date().getTime();
    window.localStorage.setItem('design', JSON.stringify(this.design));
  }

  @action selectProduct(productId) {
    this.design = {
      productId,
      images: [],
      texts: [],
    };
    window.localStorage.setItem('design', JSON.stringify(this.design));
  }
}

export default function init(productId, images, texts) {
  if (store === null || typeof window === 'undefined') {
    store = new DesignStore(productId, images, texts);
  }
  if (store) {
    if (productId) {
      store.design.productId = productId;
    }
    if (images) {
      store.design.images = images;
    }
    if (texts) {
      store.design.texts = texts;
    }
  }
  return store;
}
