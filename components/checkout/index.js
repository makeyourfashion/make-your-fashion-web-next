import React from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from '../AppBar';
import Footer from '../Footer';
import ShippingDetail from './ShippingDetail';
import Payment from './Payment';
import PlaceOrder from './PlaceOrder';
import Snackbar from '../Snackbar';
import Router from 'next/router';

@inject('cartStore', 'productDetailStore', 'identityStore') @observer
export default class Checkout extends React.Component {
  state = {
    step: 0,
    address: {},
    showSuccessMessage: false,
  }

  componentDidMount() {
    this.props.cartStore.cartItems.slice().forEach((item) => {
      this.props.productDetailStore.fetchProductDetail(item.productId);
    });
  }

  handleGotoPayment = (address) => {
    this.setState({
      step: 1,
      address,
    });
  }

  handleGotoReview = () => {
    this.setState({
      step: 2,
    });
  }

  handlePlaceOrder = () => {
    this.setState({
      showSuccessMessage: true,
    });
    this.props.cartStore.clearCart();
    window.setTimeout(() => {
      Router.push('/shop?category=2');
    }, 4000);
  }

  render() {
    const cartItems = this.props.cartStore.cartItems.slice();
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
          h2 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
          .main-form {
            border-bottom: 1px solid #000;
          }
          .summary {
            font-weight: bold;
            margin: auto;
            max-width: 250px;
          }
          .container {
            max-width: 1024px;
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
        `}</style>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid">
            <div className="main-form mdc-layout-grid__cell mdc-layout-grid__cell--span-8">
              <h2>结账</h2>
              <div className="steps">
                <div className={this.state.step === 0 ? 'active-step' : ''}>邮寄地址</div>
                <div>&gt;</div>
                <div className={this.state.step === 1 ? 'active-step' : ''}>支付</div>
                <div>&gt;</div>
                <div className={this.state.step === 2 ? 'active-step' : ''}>下单</div>
              </div>
              {
                (() => {
                  if (this.state.step === 0) {
                    const phone = this.props.identityStore.phone;
                    return phone ? (
                      <ShippingDetail
                        onNext={this.handleGotoPayment}
                        phone={phone}
                      />
                    ) : null;
                  } else if (this.state.step === 1) {
                    return <Payment onNext={this.handleGotoReview} />;
                  } else if (this.state.step === 2) {
                    return <PlaceOrder address={this.state.address} onNext={this.handlePlaceOrder} />;
                  }
                  return <div />;
                })()
              }
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
              <h2>总结</h2>
              {
                cartItems.map((item) => {
                  const productDetail = this.props.productDetailStore
                    .getProductDetail(item.productId) || {};
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
                  <div>¥100</div>
                </div>
                <div className="label-list">
                  <div>运费：</div>
                  <div>0</div>
                </div>
                <div className="label-list">
                  <div>总计</div>
                  <div>¥100</div>
                </div>
              </div>
            </div>
          </div>
          <Snackbar
            open={this.state.showSuccessMessage}
            message="成功下单，即将跳转至购物页面"
          />
        </div>
        <Footer />
      </div>
    );
  }
}

