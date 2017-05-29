import React from 'react';
import Router from 'next/router';

export default class ProductCard extends React.Component {
  handleProductSelect = () => {
    Router.push(`/create?product=${this.props.product.id}`);
  }

  render() {
    return (
      <div className="product-card" onClick={this.handleProductSelect}>
        <style jsx>{`
          .product-card {
            width: 25%;
            max-width: 220px;
            min-width: 150px;
            margin-bottom: 40px;
            padding-right: 20px;
          }
          .product-card:hover {
            cursor: pointer;
          }
          .product-card-image {
            width: 100%;
            height: 100%;
            background-color: rgb(233, 233, 233);
          }
          .description {
            font-size: 1.1em;
            margin-top: 10px;
            text-align: center;
          }
        `}</style>
        <div>
          <img alt={this.props.product.imgUrl} className="product-card-image" src={this.props.product.imgUrl} />
          <div className="description">
            <div>{this.props.product.name}</div>
            <div>¥100</div>
          </div>
        </div>
      </div>
    );
  }
}
