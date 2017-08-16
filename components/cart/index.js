import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import 'isomorphic-fetch';
import withLayout from '../Layout';
import { placeOrder } from '../../stores/action';

@withLayout @inject('cartStore', 'productStore') @observer
export default class Cart extends React.Component {
  state = {
    step: 0,
    address: {},
    showSuccessMessage: false,
    paySuccess: false,
    addressEntered: false,
  }

  componentDidMount() {
    this.props.cartStore.cartItems.slice().forEach((item) => {
      this.props.productStore.fetchProduct(item.productId);
    });
  }

  handleGotoPayment = (address) => {
    this.setState({
      step: 1,
      address,
      addressEntered: true,
    });
  }

  handleGotoReview = () => {
    this.setState({
      step: 2,
      paySuccess: true,
    });
  }

  handlePlaceOrder = () => {
    const order = {
      ...this.state.address,
      userId: this.props.identityStore.id,
      orderItem: this.props.cartStore.cartItems.map(({ size, qty, imgUrl, itemId, price, images, texts }) => ({
        size, qty, itemId, price, img: imgUrl, images, texts,
      })),
    };

    placeOrder(order, () => {
      this.setState({
        showSuccessMessage: true,
      });
    });
  }

  goToShipping = (e) => {
    e.preventDefault();
    this.setState({
      step: 0,
    });
  }

  goToPayment = (e) => {
    e.preventDefault();
    this.setState({
      step: 1,
    });
  }

  goToPlaceOrder = (e) => {
    e.preventDefault();
    this.setState({
      step: 2,
    });
  }

  handleRemoveCartItem = (e) => {
    this.props.cartStore.removeCartItem(+e.target.getAttribute('data-cart-id'));
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
            align-items: center;
            justify-content: space-between;
          }
          .container {
            max-width: 600px !important;
          }

          .cart-item {
            margin: auto;
            margin-top: 20px;
            margin-bottom: 20px;
            height: 100%;
            display: flex;
            justify-content: space-between;
            width: 350px;
            max-width: 100%;
          }
          .cart-image {
            width: 34%;
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
          h2 {
            padding-bottom: 10px;
            text-align: center;
            border-bottom: 1px solid #dedede;
          }
          .empty-tag {
            text-align: center;
            margin: 40px 0 40px;
            border-bottom: solid 1px #ccc;
          }
          .main-form {
            border-bottom: 1px solid #000;
            max-width: 500px;
          }
          .summary {
            font-weight: bold;
            margin: auto;
            max-width: 350px;
          }

          .steps {
            display: flex;
            justify-content: space-between;
            letter-spacing: .1em;
            font-weight: bold;
            color: #ccc;
            padding-bottom: 10px;
            border-bottom: 1px solid #dedede;
          }
          .active-step {
            color: #000;
          }
          .design-button {
            margin: 40px 0 40px;
          }
          .des-line1 {
            display: flex;
            justify-content: space-between;
          }
          .edit-link {
            color: #ff5a5f;
            border: none;
            background-color: #fdfdf9;
          }
          .edit-link:hover {
            cursor: pointer;
          }
        `}</style>
        <div className="container">
          <div>
            <h2>购物车</h2>
            {
              cartItems.length ? (
                <div>
                  <ul className="cart-list">
                  {
                    cartItems.map((item) => {
                      const productDetail = this.props.productStore
                        .getProduct(item.productId) || {};
                      return (
                        <div key={item.id} className="cart-item">
                          <img className="cart-image" alt="product" height={100} width={100} src={item.imgUrl} />
                          <div className="cart-des">
                            <div className="des-line1">
                              <div className="product-name">{productDetail.name}</div>
                              <div>
                                <Link href={`/create?cart=${item.id}`}>
                                  <a className="edit-link">编辑</a>
                                </Link>
                                <button data-cart-id={item.id} onClick={this.handleRemoveCartItem} className="edit-link">删除</button>
                              </div>
                            </div>
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
                      );
                    })
                  }
                  </ul>
                  <div className="summary">
                    <div className="label-list">
                      <div>商品总价：<span>¥{totalPrice}</span></div>
                      <Link href="/checkout">
                        <a className="border-button">结账</a>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="empty-tag">
                  您的购物车为空
                  <div className="design-button">
                    <Link href="/create?product=1">
                      <a className="border-button">立即开始定制</a>
                    </Link>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

