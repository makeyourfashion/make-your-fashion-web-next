import React from 'react';
import { inject, observer } from 'mobx-react';
import Modal from '../Modal';
import PictureCard from './PictureCard';

@inject('pictureStore', 'designStore') @observer
export default class SelectPictureModal extends React.Component {
  state = {
    tag: null,
  }

  render() {
    let pictures;
    if (this.state.tag) {
      pictures = this.props.pictureStore.getPicturesByTag(this.state.tag);
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
        `}</style>
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
