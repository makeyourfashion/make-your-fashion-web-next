import React from 'react';
import { range } from 'lodash';
import { inject, observer } from 'mobx-react';
import { SelectField, SelectItem } from '../SelectField';

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
          .select {
            width: 45%;
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
          <img className="rate-img" src="https://jcrew.ugc.bazaarvoice.com/1706redes-en_us/3_5/5/rating.png" alt="3.5 / 5" title="3.5 / 5" />
        </div>
        <div className="subtitle">{product.des}</div>
        <div className="details">
          <div className="form-field">
            <span>颜色：</span>
            <span>灰色</span>
          </div>
          <div className="form-field">
            <span>单价：</span>
            <span>¥100</span>
          </div>
        </div>
        <form noValidate>
          <div className="form-field select-list">
            <div className="select">
              <label htmlFor="select-size">选择尺码：</label><br />
              <SelectField
                id="select-size"
                value={this.props.order.size}
                onChange={this.handleSelectSize}
              >
                {
                  product.sizes.map(n =>
                    <SelectItem key={n} value={n}>{n}</SelectItem>,
                  )
                }
              </SelectField>
              <div className="error-msg">{this.props.order.sizeError}</div>
            </div>
            <div className="select">
              <label htmlFor="select-size">选择数量：</label><br />
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
              <div className="error-msg">{this.props.order.qtyError}</div>
            </div>
          </div>
          <div className="action-area">
            {
              this.props.cartId ? <button type="submit" onClick={this.handleUpdateCart} className="mdc-button mdc-button--raised mdc-button--accent button-full-width add-to-cart-button">
                更新购物车
              </button> : <button onClick={this.addToCart} className="add-to-cart-button mdc-button mdc-button--raised mdc-button--accent button-full-width">
                添加到购物车
              </button>
            }
          </div>
        </form>
      </div>
    );
  }
}
