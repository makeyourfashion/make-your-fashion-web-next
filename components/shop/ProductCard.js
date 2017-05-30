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
            width: 33%;
            max-width: 350px;
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
            background-color: rgb(245, 245, 245);
          }
          .description {
            font-size: 0.95em;
            font-weight: 400;
            margin-top: 10px;
            text-align: center;
          }
          .price-label {
            font-weight: 300;
          }
        `}</style>
        <div>
          <img alt={this.props.product.imgUrl} className="product-card-image" src={this.props.product.imgUrl} />
          <div className="description">
            <div>{this.props.product.name}</div>
            <div className="price-label">¥100</div>
          </div>
        </div>
      </div>
    );
  }
}
