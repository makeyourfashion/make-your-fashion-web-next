import React from 'react';
import { range, isEmpty } from 'lodash';
import { inject, observer } from 'mobx-react';
import { SelectField, SelectItem } from '../SelectField';
import EditTextPanel from './EditTextPanel';

@inject('designStore') @observer
export default class OrderForm extends React.Component {
  state = {
    size: null,
    qty: null,
    sizeError: null,
    qtyError: null,
  }

  handleSelectQty = (value) => {
    this.setState({
      qty: value,
    });
  }

  handleSelectSize = (value) => {
    this.setState({
      size: value,
    });
  }

  addToCart = (e) => {
    e.preventDefault();
    const { size, qty } = this.state;
    const errors = {};

    if (!size) {
      errors.sizeError = '请选择尺码';
    }
    if (!qty) {
      errors.qtyError = '请选择数量';
    }
    if (!isEmpty(errors)) {
      this.setState({
        ...errors,
      });
      return;
    }
    this.setState({
      qtyError: null,
      sizeError: null,
    });
    const newCartItem = {
      size,
      qty: +qty,
      ...this.props.designStore.design,
    };

    this.props.onAddCartItem(newCartItem);
  }

  render() {
    const product = this.props.product;
    return (
      <div>
        <style jsx>{`
          h2 {
            margin: 5px 0 5px 0;
          }
          .title {
            margin-bottom: 20px;
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
        `}</style>
        <div className="title">
          <h2>{product.name}</h2>
          <div className="subtitle">{product.des}</div>
        </div>
        <div className="form-field">
          <span>单价：</span>
          <span>¥100</span>
        </div>
        <form noValidate onSubmit={this.addToCart} >
          <div className="form-field select-list">
            <div className="select">
              <label htmlFor="select-size">选择尺码：</label><br />
              <SelectField
                id="select-size"
                value={this.state.size}
                onChange={this.handleSelectSize}
              >
                {
                  product.sizes.map(n =>
                    <SelectItem key={n} value={n}>{n}</SelectItem>,
                  )
                }
              </SelectField>
              <div className="error-msg">{this.state.sizeError}</div>
            </div>
            <div className="select">
              <label htmlFor="select-size">选择数量：</label><br />
              <SelectField
                id="select-size"
                value={this.state.qty}
                onChange={this.handleSelectQty}
              >
                {
                  range(0, 12).map(n =>
                    <SelectItem key={n} value={n}>{n}</SelectItem>,
                  )
                }
              </SelectField>
              <div className="error-msg">{this.state.qtyError}</div>
            </div>
          </div>
          {
            this.props.editable ? <EditTextPanel /> : null
          }
          <button type="submit" className="add-to-cart-button mdc-button mdc-button--raised mdc-button--primary button-full-width">
            添加到购物车
          </button>
        </form>
      </div>
    );
  }
}
