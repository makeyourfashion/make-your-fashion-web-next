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
          }
          .description {
            text-align: center;
          }
          .description h4 {
            margin-bottom: 10px;
          }
          .price-label {
            color: #757575;
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
            <h4>{this.props.product.name}</h4>
            <div className="price-label">¥100</div>
          </div>
        </div>
      </div>
    );
  }
}
