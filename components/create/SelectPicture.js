import React from 'react';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import PictureCard from './PictureCard';
import UploadImageButton from './UploadImageButton';
import Carousel from '../Carousel';

@inject('pictureStore', 'designStore') @observer
export default class SelectPicture extends React.Component {
  @observable tag = null;

  handleClickTag = async (e) => {
    e.preventDefault();
    const tag = e.target.getAttribute('href');
    await this.props.pictureStore.fetchPictures(tag);
    this.tag = tag;
  }

  render() {
    let pictures;
    if (this.tag) {
      pictures = this.props.pictureStore.getPicturesByTag(this.tag);
    } else {
      pictures = this.props.pictureStore.allDesigns;
    }

    return (
      <div>
        <style jsx>{`
          .picture-list {
            margin-top: 10px;
            margin: 40px 0 20px 0;
            display: flex;
            flex-wrap: wrap;
            max-height: 450px;
            overflow: auto;
          }
          .category-list {
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
          }
          .category-button {
            margin-right: 10px;
            padding: 0 5px 0 5px;
          }
          .active-category {
            background-color: #00b2a6;
            color: #fff;
          }
          .line1 {
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          @media (max-width: 600px) {
            .line1 h3 {
              margin: 0;
            }
            .picture-list {
              overflow: auto;
              white-space: nowrap !important;
            }
            .line1 :global(div) {
              margin: 5px;
            }
          }
        `}</style>
        <div className="line1">
          <h3>素材库</h3>
          <UploadImageButton />
        </div>
        <div ref={(r) => { this.categories = r; }} className="category-list">
          <a
            className={`category-button ${+this.tag === 0 ? 'active-category' : ''}`}
            onClick={this.handleClickTag}
            href={0}
          >全部图片</a>
          {
            this.props.pictureStore.allTags.map(tag => (
              <a
                className={`category-button ${tag.id === +this.tag ? 'active-category' : ''}`}
                href={tag.id}
                onClick={this.handleClickTag}
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
      </div>
    );
  }
}
