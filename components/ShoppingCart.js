import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { MDCSimpleMenu } from '@material/menu/dist/mdc.menu';

@inject('cartStore', 'productDetailStore', 'identityStore') @observer
export default class ShoppingCart extends React.Component {
  componentDidMount() {
    this.menu = new MDCSimpleMenu(this.menuDom);
    this.props.cartStore.cartItems.slice().forEach((item) => {
      this.props.productDetailStore.fetchProductDetail(item.productId);
    });
  }

  handleToggleCartMenu = () => {
    const menu = this.menu;
    if (menu) {
      menu.open = !menu.open;
    }
  }

  handleCheckout = () => {
    if (this.props.identityStore.isLoggedIn) {
      Router.push('/checkout');
    } else {
      Router.push(`/login?redirect=${encodeURIComponent('/checkout')}`);
    }
  }

  render() {
    const cartItems = this.props.cartStore.cartItems.slice();
    return (
      <div className="mdc-menu-anchor">
        <style jsx>{`
          .cart-list {
            margin-top: 10px;
            border-bottom: 1px solid #dedede;
          }
          .cart-item {
            margin: 10px 0 10px 0;
            height: 100%;
            display: flex;
            justify-content: space-around;
            width: 300px;
            max-width: 100%;
          }
          .cart-image {
            width: 34%;
          }
          img {
            background-color: rgb(245, 245, 245);
          }
          .cart-des {
            width: 66%;
            padding-left: 20px;
          }
          h4 {
            text-align: center;
          }
          .checkout {
            margin: 0 10px 20px 10px;
          }
        `}</style>
        <button
          onClick={this.handleToggleCartMenu}
          className="icon-button"
        ><i className="material-icons">shopping_cart</i></button>
        <div className="mdc-simple-menu" ref={(r) => { this.menuDom = r; }}>
          {
            <ul className="mdc-simple-menu__items mdc-list cart-list" role="menu" aria-hidden="true">
              {
                !cartItems.length ? (
                  <li className="mdc-list-item" role="menuitem">
                    您的购物车为空
                  </li>
                ) :
                cartItems.map((item) => {
                  const productDetail = this.props.productDetailStore
                    .getProductDetail(item.productId) || {};
                  return (
                    <li key={item.id} className="mdc-list-item cart-item" role="menuitem">
                      <div className="cart-item">
                        <img className="cart-image" alt="product" height={100} width={100} src={item.imgUrl} />
                        <div className="cart-des">
                          <div>{productDetail.name}</div>
                          <div>¥100</div>
                          <div>
                            <span>尺码：</span>
                            <span>{item.size}</span>
                          </div>
                          <div>
                            <span>数量：</span>
                            <span>{item.qty}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          }
          {
            cartItems.length ? (
              <div className="checkout">
                <h4>总计：¥100</h4>
                <button
                  onClick={this.handleCheckout}
                  className="add-to-cart-button mdc-button mdc-button--raised mdc-button--accent button-full-width"
                >
                  结账
                </button>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}
