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
            display: inline-block;
            width: 19%;
            max-width: 180px;
            margin-bottom: 20px;
            padding-right: 1%;
          }
          @media (max-width: 599px) {
            .picture-card {
              display: inline-block;
              width: 21%;
            }
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
          <img crossOrigin="anonymous" alt={this.props.picture.name} className="picture-card-image image" src={this.props.picture.imgUrl} />
        </div>
      </div>
    );
  }
}
