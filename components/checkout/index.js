import React from 'react';
import { inject, observer } from 'mobx-react';
import withLayout from '../Layout';
import ShippingDetail from './ShippingDetail';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import Snackbar from '../Snackbar';
import { placeOrder } from '../../stores/action';

@withLayout @inject('cartStore', 'productStore', 'identityStore') @observer
export default class Checkout extends React.Component {
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
            justify-content: space-between;
          }
          .cart-item {
            margin: 10px 0 10px 0;
            height: 100%;
            display: flex;
            justify-content: space-between;
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
          h2 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
            margin-top: 0;
          }
          .main-form {
            max-width: 500px;
          }
          .summary {
            font-weight: bold;
            margin: auto;
          }
          .container {
            max-width: 960px;
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
          .des-line1 {
            display: flex;
            justify-content: space-between;
          }
          .edit-link {
            padding: 0;
            color: #ff5a5f;
            border: none;
            background-color: #fdfdf9;
          }
          .edit-link:hover {
            cursor: pointer;
          }
        `}</style>
        <div className="container">
          <div className="mdc-layout-grid">
            <div className="mk-card yz-card mdc-layout-grid__cell mdc-layout-grid__cell--span-7">
              <h2>结账</h2>
              <div className="steps">
                <a href="/checkout" onClick={this.goToShipping} className={this.state.step === 0 ? 'active-step' : ''}>邮寄地址</a>
                <div>&gt;</div>
                {
                  this.state.addressEntered ? <a href="/checkout" onClick={this.goToPayment} className={this.state.step === 1 ? 'active-step' : ''}>支付</a>
                    : <div className={this.state.step === 1 ? 'active-step' : ''}>支付</div>
                }
                <div>&gt;</div>
                {
                  this.state.paySuccess ? <a href="/checkout" onClick={this.goToPlaceOrder} className={this.state.step === 2 ? 'active-step' : ''}>下单</a>
                    : <div className={this.state.step === 2 ? 'active-step' : ''}>下单</div>
                }
              </div>
              {
                (() => {
                  if (this.state.step === 0) {
                    return (
                      <ShippingDetail
                        onNext={this.handleGotoPayment}
                        {...this.state.address}
                      />
                    );
                  } else if (this.state.step === 1) {
                    return <Payment onNext={this.handleGotoReview} />;
                  } else if (this.state.step === 2) {
                    return <PlaceOrder address={this.state.address} onNext={this.handlePlaceOrder} />;
                  }
                  return <div />;
                })()
              }
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-5">
              <div className="mk-card yz-card">
                <h2>总结</h2>
                {
                  cartItems.map((item) => {
                    const productDetail = this.props.productStore
                      .getProduct(item.productId) || {};
                    return (
                      <ul className="cart-list" key={item.id}>
                        <div className="cart-item">
                          <img className="cart-image" alt="product" height={100} width={100} src={item.imgUrl} />
                          <div className="cart-des">
                            <div className="des-line1">
                              <div className="product-name">{productDetail.name}</div>
                              <div>
                                {/* <Link href={`/create?cart=${item.id}`}>
                                  <a className="edit-link">编辑</a>
                                </Link> */}
                                <button data-cart-id={item.id} onClick={this.handleRemoveCartItem} className="edit-link">删除</button>
                              </div>
                            </div>
                            <div className="label label-list">
                              <div>单价：</div>
                              <div>¥{item.price}</div>
                            </div>
                            {
                              item.size && (
                                <div className="label label-list">
                                  <div>尺码：</div>
                                  <div>{item.size}</div>
                                </div>
                              )
                            }
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
            </div>
          </div>
          <Snackbar
            open={this.state.showSuccessMessage}
            message="成功下单"
          />
        </div>
      </div>
    );
  }
}
