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
  // const context = canvas.getContext('2d');
  const resizedCanvas = document.createElement('canvas');
  const resizedContext = resizedCanvas.getContext('2d');
  resizedCanvas.height = '200';
  resizedCanvas.width = '200';

  resizedContext.drawImage(canvas, 0, 0, 200, 200);
  return resizedCanvas.toDataURL();
}

@inject('productDetailStore', 'cartStore', 'identityStore') @observer
export default class CreateView extends React.Component {
  state = {
    editable: true,
    showSuccessMessage: false,
  }

  handleEdit = () => {
    this.setState({
      editable: true,
    });
  }

  handlePreview = () => {
    this.setState({
      editable: false,
    });
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

  render() {
    return (
      <div>
        <style global jsx>{`
          .button-group {
            margin: auto;
            display: flex;
            justify-content:center;
          }
          .active-tab {
            background-color: var(--mdc-theme-primary);
            color: var(--mdc-theme-text-primary-on-primary,#fff);
          }
        `}</style>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
              <Menu />
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
              <div className="button-group">
                <button
                  className={`mdc-button ${this.state.editable ? 'active-tab' : ''}`}
                  onClick={this.handleEdit}
                >
                  编辑
                </button>
                <button
                  className={`mdc-button ${!this.state.editable ? 'active-tab' : ''}`}
                  onClick={this.handlePreview}
                >
                  预览
                </button>
              </div>
              <Design
                editable={this.state.editable}
                product={this.props.productDetailStore.getProductDetail(this.props.productId)}
              />
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
              <OrderForm
                onAddCartItem={this.handleAddToCart}
                editable={this.state.editable}
                product={this.props.productDetailStore.getProductDetail(this.props.productId)}
              />
            </div>
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
