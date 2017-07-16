import React from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import AppBar from '../AppBar';
import Footer from '../Footer';
import Menu from './Menu';
import Design from './Design';
import OrderForm from './OrderForm';
import Snackbar from '../Snackbar';
import EditTextPanel from './EditTextPanel';

function getCanvasImgUrl() {
  const canvas = document.querySelector('canvas');
  const resizedCanvas = document.createElement('canvas');
  const resizedContext = resizedCanvas.getContext('2d');
  resizedCanvas.height = '200';
  resizedCanvas.width = '200';

  resizedContext.drawImage(canvas, 0, 0, 200, 200);
  return resizedCanvas.toDataURL();
}

@inject('productStore', 'cartStore', 'identityStore', 'designStore') @observer
export default class CreateView extends React.Component {
  constructor(props) {
    super(props);
    let order;
    if (this.props.cartId) {
      const { size, qty } = this.props.cartStore.getCartItem(this.props.cartId);
      order = {
        size, qty, sizeError: '', qtyError: '',
      };
    } else {
      order = { sizeError: '', qtyError: '' };
    }
    this.state = {
      editable: true,
      showSuccessMessage: false,
      tabIndex: 0,
      order,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleToggleEditable);
    document.addEventListener('touchstart', this.handleToggleEditable);
    autorun(() => {
      if (this.props.designStore.showEditText) {
        this.setState({
          tabIndex: 1,
        });
      }
    });
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

  handleAddToCart = () => {
    const { size, qty } = this.state.order;
    const errors = {};

    if (!size) {
      errors.sizeError = '请选择尺码';
    }
    if (!qty) {
      errors.qtyError = '请选择数量';
    }
    if (!isEmpty(errors)) {
      this.setState({
        order: {
          ...this.state.order,
          ...errors,
        },
        tabIndex: 0,
      }, () => {
        window.scroll(0, document.querySelector('.select-list').offsetTop - (window.outerHeight / 2));
      });
      return;
    }

    this.setState({
      showSuccessMessage: true,
      editable: false,
      order: {
        ...this.state.order,
        sizeError: '',
        qtyError: '',
      },
    }, () => {
      window.setTimeout(() => {
        const { price, itemId } = this.getProduct();
        const newCartItem = {
          itemId,
          price: +price * +qty,
          size,
          qty: +qty,
          imgUrl: getCanvasImgUrl(),
          ...this.props.designStore.design,
        };
        this.props.cartStore.addCartItem(newCartItem);
      }, 500);
    });
    window.setTimeout(() => {
      this.setState({
        showSuccessMessage: false,
      });
    }, 4000);
  }

  handleUpdateCart = () => {
    this.setState({
      showSuccessMessage: true,
      editable: false,
    }, () => {
      window.setTimeout(() => {
        const { size, qty } = this.state.order;
        const newCartItem = {
          id: +this.props.cartId,
          size,
          qty: +qty,
          imgUrl: getCanvasImgUrl(),
          ...this.props.designStore.design,
        };
        this.props.cartStore.updateCartItem(newCartItem);
      }, 500);
    });
    window.setTimeout(() => {
      this.setState({
        showSuccessMessage: false,
      });
    }, 4000);
  }

  goToDetails = (e) => {
    e.preventDefault();
    this.setState({
      tabIndex: 0,
    });
  }

  goToText = (e) => {
    e.preventDefault();
    this.setState({
      tabIndex: 1,
    });
  }
  handleOrderChange = (order) => {
    this.setState({
      order,
    });
  }

  getProduct() {
    let productId;
    if (this.props.productId) {
      productId = this.props.productId;
    } else {
      const cartItem = this.props.cartStore.getCartItem(this.props.cartId);
      if (cartItem) {
        productId = cartItem.productId;
      }
    }

    return this.props.productStore.getProduct(productId);
  }

  render() {
    const product = this.getProduct();

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
          .details-text-tab {
            border-bottom: 1px solid #dedede;
            margin: 0 0 20px 0;
            width: 100%;
          }
          @media (min-width: 600px) {
            .action-area {
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
              <div>
                <div>
                  <nav className="mdc-tab-bar details-text-tab">
                    <a className={`mdc-tab ${this.state.tabIndex === 0 ? 'mdc-tab--active' : ''}`} href="0" onClick={this.goToDetails}>商品详情</a>
                    {
                      this.props.designStore.design.texts.length ? (
                        <a className={`mdc-tab ${this.state.tabIndex === 1 ? 'mdc-tab--active' : ''}`} href="1" onClick={this.goToText}>文字</a>
                      ) : null
                    }
                    <span className="mdc-tab-bar__indicator" />
                  </nav>
                  {
                    this.state.tabIndex === 0 ? <OrderForm
                      onAddCartItem={this.handleAddToCart}
                      onUpdateCart={this.handleUpdateCart}
                      onOrderChange={this.handleOrderChange}
                      editable={this.state.editable}
                      product={product}
                      order={this.state.order}
                      cartId={this.props.cartId}
                    /> : <EditTextPanel />
                  }
                  {
                    this.props.cartId ? <button onClick={this.handleUpdateCart} className="mdc-button mdc-button--raised mdc-button--accent button-full-width add-to-cart-button">
                      更新购物车
                    </button> : <button onClick={this.handleAddToCart} className="add-to-cart-button mdc-button mdc-button--raised mdc-button--accent button-full-width">
                      添加到购物车
                    </button>
                  }
                </div>
              </div>
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
              </button> : <button onClick={this.handleAddToCart} className="add-to-cart-button mdc-button mdc-button--raised mdc-button--accent button-full-width">
                添加到购物车
              </button>
            }
          </div>
          <div className="detail-img-list">
            <h3 className="title">商品详情：</h3>
            <img className="detail-img" src="/static/image/1.jpg" alt="img" />
            <img className="detail-img" src="/static/image/2.jpg" alt="img" />
            <img className="detail-img" src="/static/image/3.jpg" alt="img" />
            <img className="detail-img" src="/static/image/4.png" alt="img" />
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
