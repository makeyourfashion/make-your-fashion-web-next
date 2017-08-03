import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('cartStore', 'productStore') @observer
export default class PlaceOrder extends React.Component {
  state = {
    submit: false,
  }

  handleSubmit = () => {
    this.setState({
      submit: true,
    });
    this.props.onNext();
  }

  render() {
    const cartItems = this.props.cartStore.cartItems.slice();
    const totalPrice = cartItems.map(item => item.price).reduce((a, b) => (+a) + (+b), 0);
    return (
      <div>
        <style jsx>{`
          .cart-list {
            border-bottom: 1px solid #dedede;
          }
          .label-list {
            display: flex;
            justify-content: space-between;
          }
          .cart-item {
            margin: 10px 0 10px 0;
            height: 100%;
            display: flex;
            justify-content: space-between;
            width: 300px;
            max-width: 100%;
          }
          .cart-image {
            width: 34%;
          }
          img {
            background-color: rgb(240,240,240);
          }
          .cart-des {
            width: 66%;
            padding-left: 20px;
          }
          .label {
            font-size: 0.9em;
            margin: 5px 0 5px 0;
          }
          .product-name {
            font-weight: bold;
            font-size: 1.1em;
          }

          .summary {
            font-weight: bold;
            margin: auto;
            max-width: 250px;
          }
          .next-step {
            margin: 20px 0 40px 0;
          }
          .address-info {
            font-size: 0.9em;
            border-bottom: 1px solid #000;
            padding-bottom: 10px;
          }
          h4 {
            font-size: 1.0em;
            font-weight: bold;
            border-bottom: 1px solid #dedede;
          }
          h3 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
        `}</style>
        <h3>总结</h3>
        <div className="address-info">
          <h4>邮寄地址</h4>
          <div>{this.props.address.name}</div>
          <div>{this.props.address.address}</div>
          <div>{this.props.address.phone}</div>
        </div>
        <div>
          <h4>商品信息</h4>
          {
            cartItems.map((item) => {
              const productDetail = this.props.productStore
                .getProduct(item.productId) || {};
              return (
                <ul className="cart-list" key={item.id}>
                  <div className="cart-item">
                    <img className="cart-image" alt="product" height={100} width={100} src={item.imgUrl} />
                    <div className="cart-des">
                      <div className="product-name">{productDetail.name}</div>
                      <div className="label">¥100</div>
                      <div className="label label-list">
                        <div>尺码：</div>
                        <div>{item.size}</div>
                      </div>
                      <div className="label label-list">
                        <div>数量：</div>
                        <div>{item.qty}</div>
                      </div>
                    </div>
                  </div>
                </ul>
              );
            })
          }
          <div className="summary">
            <div className="label-list">
              <div>商品总价：</div>
              <div>¥{totalPrice}</div>
            </div>
            <div className="label-list">
              <div>运费：</div>
              <div>¥10</div>
            </div>
            <div className="label-list">
              <div>折扣：</div>
              <div>－¥7.5</div>
            </div>
            <div className="label-list">
              <div>总计：</div>
              <div>¥{totalPrice + 2.5}</div>
            </div>
          </div>
        </div>
        <div className="next-step">
          <button disabled={this.state.submit} onClick={this.handleSubmit} className="mdc-button mdc-button--raised mdc-button--primary button-full-width">
            {
              this.state.submit ? '正在下单...' : '确认无误，下单'
            }
          </button>
        </div>
      </div>
    );
  }
}
