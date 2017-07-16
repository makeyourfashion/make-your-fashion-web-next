import React from 'react';
import { range } from 'lodash';
import { inject, observer } from 'mobx-react';
import { SelectField, SelectItem } from '../SelectField';
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

  addToCart = (e) => {
    e.preventDefault();
    this.props.onAddCartItem();
  }

  handleUpdateCart = (e) => {
    e.preventDefault();
    this.props.onUpdateCart();
  }

  render() {
    const product = this.props.product;
    return (
      <div className="details-wrapper">
        <style jsx>{`
          .subtitle {
            margin-bottom: 20px;
          }
          .rate-img {
            width: 83px;
            height: 14px;
          }
          h2 {
            margin: 5px 0 5px 0;
          }
          .title {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
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
          .add-to-cart-button {
            margin-top: 20px;
          }
          .select-list {
            margin-bottom: 40px;
          }
          .details {
            display: flex;
          }
          .details > .form-field:nth-child(2) {
            margin-left: 40px;
          }

          @media (max-width: 600px) {
            .action-area {
              display: none;
            }
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
        <form noValidate>
          <div className="form-field select-list">
            <div>
              <label htmlFor="select-size">
                选择尺码：
                <SelectField
                  id="select-size"
                  value={this.props.order.size}
                  onChange={this.handleSelectSize}
                >
                  {
                    product.sizes.split(',').map(n =>
                      <SelectItem key={n} value={n}>{n}</SelectItem>,
                    )
                  }
                </SelectField>
              </label>
              <div className="error-msg">{this.props.order.sizeError}</div>
            </div>
            <div>
              <label htmlFor="select-size">
                选择数量：
                <SelectField
                  id="select-size"
                  value={this.props.order.qty}
                  onChange={this.handleSelectQty}
                >
                  {
                    range(1, 12).map(n =>
                      <SelectItem key={n} value={n}>{n}</SelectItem>,
                    )
                  }
                </SelectField>
              </label>
              <div className="error-msg">{this.props.order.qtyError}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
