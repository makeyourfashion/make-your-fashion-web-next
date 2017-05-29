import React from 'react';

export default class PictureCard extends React.Component {
  componentDidMount() {
    // for some reason on click is not working inside modal;
    this.card.addEventListener('click', () => {
      this.props.onSelect(this.props.picture.id, this.props.picture.imgUrl);
    });
  }

  render() {
    return (
      <div ref={(r) => { this.card = r; }} className="picture-card">
        <style jsx>{`
          .picture-card {
            width: 25%;
            max-width: 180px;
            min-width: 120px;
            margin-bottom: 20px;
            padding-right: 20px;
          }
          .picture-card:hover {
            cursor: pointer;
          }
          .picture-card-image {
            width: 100%;
            height: 100%;
            background-color: rgb(233, 233, 233);
          }
        `}</style>
        <div>
          <img alt={this.props.picture.name} className="picture-card-image" src={this.props.picture.imgUrl} />
        </div>
      </div>
    );
  }
}
