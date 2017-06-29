import React from 'react';
import { range, isEmpty } from 'lodash';
import { inject, observer } from 'mobx-react';
import { SelectField, SelectItem } from '../SelectField';
import EditTextPanel from './EditTextPanel';

@inject('designStore', 'cartStore') @observer
export default class OrderForm extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.cartId) {
      const { size, qty } = this.props.cartStore.getCartItem(this.props.cartId);
      this.state = {
        size,
        qty,
        sizeError: '',
        qtyError: '',
      };
    } else {
      this.state = {
        size: '',
        qty: '',
        sizeError: '',
        qtyError: '',
      };
    }
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
      window.scroll(0, this.selectList.offsetTop - (window.outerHeight / 2));
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

  handleUpdateCart = (e) => {
    e.preventDefault();
    const { size, qty } = this.state;
    const newCartItem = {
      size,
      qty: +qty,
      ...this.props.designStore.design,
    };

    this.props.onUpdateCart(newCartItem);
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
          @media (min-width: 600px) {
            .details-wrapper {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 500px;
            }
          }
          .select-list {
            margin-bottom: 20px;
          }
          @media (min-width: 600px) {
            .price-tag {
              display: none;
            }
          }

          @media (max-width: 600px) {
            .action-area {
              display: flex;
              justify-content: space-around;
              align-items: center;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
              background-color: rgba(253,253,249, 1);
              border-top: 1px solid #dedede;
              height: 60px;
            }
            .rate-img {
              width: 70px;
              height: 12px;
            }
            .price-tag {
              font-size: 13px;
              font-weight: bold;
            }
            .add-to-cart-button {
              margin-top: 0;
              width: 50%;
            }
            .select-list {
              margin-bottom: 40px;
            }
          }
        `}</style>
        <div className="title">
          <h2>{product.name}</h2>
          <div className="subtitle">{product.des}</div>
          <img className="rate-img-mobile" src="https://jcrew.ugc.bazaarvoice.com/1706redes-en_us/3_5/5/rating.png" alt="3.5 / 5" title="3.5 / 5" />
        </div>
        <div>
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
          <EditTextPanel />
          <div ref={(r) => { this.selectList = r; }} className="form-field select-list">
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
                  range(1, 12).map(n =>
                    <SelectItem key={n} value={n}>{n}</SelectItem>,
                  )
                }
              </SelectField>
              <div className="error-msg">{this.state.qtyError}</div>
            </div>
          </div>
          <div className="action-area">
            <div className="price-tag">
              ¥100
              <div>
                <img className="rate-img" src="https://jcrew.ugc.bazaarvoice.com/1706redes-en_us/3_5/5/rating.png" alt="3.5 / 5" title="3.5 / 5" />
              </div>
            </div>
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
