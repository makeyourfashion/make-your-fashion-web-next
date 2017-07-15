import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import Modal from '../Modal';
import PictureCard from './PictureCard';

@inject('pictureStore', 'designStore') @observer
export default class SelectPictureModal extends React.Component {
  componentDidMount() {
    this.categories.addEventListener('click', async (e) => {
      e.preventDefault();
      const tag = e.target.getAttribute('href');
      await this.props.pictureStore.fetchPictures(tag);
      this.tag = tag;
    });
  }

  @observable tag = null;

  render() {
    let pictures;
    if (this.tag) {
      pictures = this.props.pictureStore.getPicturesByTag(this.tag);
    } else {
      pictures = this.props.pictureStore.allDesigns;
    }

    return (
      <Modal onClose={this.props.onClose} open={this.props.open} title="选择设计图案" >
        <style jsx>{`
          .picture-list {
            margin-top: 40px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
          }
          .category-button {
            margin-right: 10px;
            padding: 0 5px 0 5px;
          }
          .category-list {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
          }
          .active-category {
            background-color: #00b2a6;
            color: #fff;
          }
          @media (max-width: 599px) {
            .picture-list {
              justify-content: space-between;
            }
          }
        `}</style>
        <div ref={(r) => { this.categories = r; }} className="category-list">
          <a
            className={`category-button ${+this.tag === 0 ? 'active-category' : ''}`}
            href={0}
          >全部图片</a>
          {
            this.props.pictureStore.allTags.map(tag => (
              <a
                className={`category-button ${tag.id === +this.tag ? 'active-category' : ''}`}
                href={tag.id}
                key={tag.id}
              >
                {tag.name}
              </a>
            ))
          }
        </div>
        <div className="picture-list">
          {
            pictures.map(pic => (
              <PictureCard
                key={pic.id}
                onSelect={this.props.onSelect}
                picture={pic}
              />
            ))
          }
        </div>
      </Modal>
    );
  }
}
