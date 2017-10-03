import React from 'react';
import { inject, observer } from 'mobx-react';
import Ratings from '../Ratings';

@inject('designStore') @observer
export default class OrderForm extends React.Component {
  handleSelectQty = (value) => {
    this.props.onOrderChange({
      ...this.props.order,
      qty: value,
    });
  }

  handleSelectSize = (value) => {
    this.props.onOrderChange({
      ...this.props.order,
      size: value,
    });
  }

  render() {
    const product = this.props.product;
    return (
      <div className="details-wrapper">
        <style jsx>{`
          .subtitle {
            margin-bottom: 1.25rem;
          }
          .rate-img {
            width: 83px;
            height: 14px;
          }
          h2 {
            margin: 5px 0 5px 0;
          }
          .title {
            margin-bottom: 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .select-list {
            margin-bottom: 2.5rem;
          }

          .select-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .select-list div {
            width: 47.5%;
          }
          .select-list div:not(:last-child) {
            margin-right: 5%;
          }
          .details {
            display: flex;
            justify-content: space-between;
          }
          .details > .form-field:nth-child(2) {
            margin-left: 2.5rem;
          }
        `}</style>
        <div className="title">
          <h2>{product.name}</h2>
          <Ratings rating={product.ratings} />
        </div>
        <div className="subtitle">{product.description}</div>
        <div className="details">
          <div className="form-field">
            <span>颜色：</span>
            <span>灰色</span>
          </div>
          <div className="form-field">
            <span>单价：</span>
            <span>¥{product.price}</span>
          </div>
        </div>
      </div>
    );
  }
}
