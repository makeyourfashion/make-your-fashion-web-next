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
            padding-bottom: 10px;
            width: 32%;
            max-width: 350px;
            min-width: 100px;
            margin-bottom: 40px;
            margin-right: 1%;
          }

          .product-card:hover {
            cursor: pointer;
          }
          .product-card-image {
            padding-bottom: 10px;
            margin-bottom: 10px;
            width: 100%;
            height: 100%;
            background-color: #f1f1f1;
          }
          .description {
            font-size: 0.95em;
            font-weight: 400;
            text-align: center;
          }
          .price-label {
            font-weight: 300;
          }
          @media (max-width: 599px) {
            .product-card {
              width: 48%;
              margin-right: 2%;
            }
          }
        `}</style>
        <div>
          <img alt={this.props.product.img} className="product-card-image" src={this.props.product.img} />
          <div className="description">
            <div>{this.props.product.name}</div>
            <div className="price-label">¥100</div>
          </div>
        </div>
      </div>
    );
  }
}
