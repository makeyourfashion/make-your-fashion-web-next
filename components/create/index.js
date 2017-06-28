import React from 'react';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import AppBar from '../AppBar';
import Footer from '../Footer';
import Menu from './Menu';
import Design from './Design';
import OrderForm from './OrderForm';
import Snackbar from '../Snackbar';

function getCanvasImgUrl() {
  const canvas = document.querySelector('canvas');
  const resizedCanvas = document.createElement('canvas');
  const resizedContext = resizedCanvas.getContext('2d');
  resizedCanvas.height = '200';
  resizedCanvas.width = '200';

  resizedContext.drawImage(canvas, 0, 0, 200, 200);
  return resizedCanvas.toDataURL();
}

@inject('productDetailStore', 'cartStore', 'identityStore', 'designStore') @observer
export default class CreateView extends React.Component {
  state = {
    editable: true,
    showSuccessMessage: false,
  }

  componentDidMount() {
    document.addEventListener('click', this.handleToggleEditable);
    document.addEventListener('touchstart', this.handleToggleEditable);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleToggleEditable);
    document.removeEventListener('touchstart', this.handleToggleEditable);
  }

  handleToggleEditable = (e) => {
    if (e.target.closest('canvas')) {
      this.setState({
        editable: true,
      });
    } else {
      this.setState({
        editable: false,
      });
    }
  }

  handleCheckout = () => {
    if (this.props.identityStore.isLoggedIn) {
      Router.push('/checkout');
    } else {
      Router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
    }
  }

  handleAddToCart = (cartItem) => {
    this.setState({
      showSuccessMessage: true,
    });
    this.setState({
      editable: false,
    }, () => {
      window.setTimeout(() => {
        this.props.cartStore.addCartItem({
          ...cartItem,
          imgUrl: getCanvasImgUrl(),
        });
      }, 500);
    });
    window.setTimeout(() => {
      this.setState({
        showSuccessMessage: false,
      });
    }, 4000);
  }

  handleUpdateCart = (cartItem) => {
    this.setState({
      showSuccessMessage: true,
    });
    this.setState({
      editable: false,
    }, () => {
      window.setTimeout(() => {
        this.props.cartStore.updateCartItem({
          id: +this.props.cartId,
          ...cartItem,
          imgUrl: getCanvasImgUrl(),
        });
      }, 500);
    });
    window.setTimeout(() => {
      this.setState({
        showSuccessMessage: false,
      });
    }, 4000);
  }

  render() {
    let productId;
    if (this.props.productId) {
      productId = this.props.productId;
    } else {
      const cartItem = this.props.cartStore.getCartItem(this.props.cartId);
      if (cartItem) {
        productId = cartItem.productId;
      }
    }

    const product = this.props.productDetailStore.getProductDetail(productId);

    return (
      <div>
        <style jsx>{`
          .detail-img {
            width: 100%;
            margin-top: 20px;
          }
          .design-container {
            border-bottom: solid 1px #dedede;
          }
          .detail-img-list {
            max-width: 800px;
            margin: auto;
          }
          .title {
            margin: 40px 0 10px 0;
            padding-bottom: 10px;
            border-bottom: solid 1px #dedede;
            font-weight: 500;
          }
        `}</style>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid design-container">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--span-12-phone mdc-layout-grid__cell--span-12-tablet">
              <Menu />
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6 mdc-layout-grid__cell--span-6-tablet">
              {
                product ? <Design
                  editable={this.state.editable}
                  product={product}
                /> : null
              }
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-6-tablet">
              {
                product ? <OrderForm
                  onAddCartItem={this.handleAddToCart}
                  onUpdateCart={this.handleUpdateCart}
                  editable={this.state.editable}
                  product={product}
                  cartId={this.props.cartId}
                /> : null
              }
            </div>
          </div>
          <div className="detail-img-list">
            <h3 className="title">商品详情：</h3>
            <img className="detail-img" src="/static/image/1.jpg" alt="img" />
            <img className="detail-img" src="/static/image/2.jpg" alt="img" />
            <img className="detail-img" src="/static/image/3.jpg" alt="img" />
            <img className="detail-img" src="/static/image/4.jpg" alt="img" />
            <img className="detail-img" src="/static/image/5.jpg" alt="img" />
            <img className="detail-img" src="/static/image/6.jpg" alt="img" />
          </div>
          <Snackbar
            open={this.state.showSuccessMessage}
            onAction={this.handleCheckout}
            actionText="结账"
            message="成功添加至购物车"
          />
        </div>
        <Footer />
      </div>
    );
  }
}
