import React from 'react';
import { inject, observer } from 'mobx-react';
import { isEmpty } from 'lodash';
import Router from 'next/router';
import AppBar from '../AppBar';
import Footer from '../Footer';
import Design from './Design';
import Snackbar from '../Snackbar';
import Ratings from '../Ratings';
import DesignPanel from './DesignPanel';
import Modal from '../Modal';

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
      tabId: 0,
      showSuccessMessage: false,
      order,
      isSelectPicModalOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleToggleEditable);
    document.addEventListener('touchstart', this.handleToggleEditable);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleToggleEditable);
    document.removeEventListener('touchstart', this.handleToggleEditable);
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

  handleSelect = (id, imgUrl) => {
    this.props.designStore.addImage(id, imgUrl);
    this.setState({
      isSelectPicModalOpen: false,
    });
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
      this.props.designStore.activeTextId = null;
    }
  }

  handleClosePictureModal = () => {
    this.setState({
      isSelectPicModalOpen: false,
    });
  }

  handleSelectPicture = (tabId) => {
    this.setState({
      isSelectPicModalOpen: true,
      tabId,
    });
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

  handleOrderChange = (order) => {
    this.setState({
      order,
    });
  }

  render() {
    const product = this.getProduct();

    return (
      <div>
        <style jsx>{`
          .container {
            max-width: 1280px;
          }
          .design-container {
            position: relative;
          }

          .right-secion {
            margin-top: 5%;
          }
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
          .desktop-button .add-to-cart-button {
            height: 50px !important;
            font-weight: bold !important;
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
            .desktop-button {
              display: none;
            }
          }
        `}</style>
        <Modal onClose={this.handleClosePictureModal} open={this.state.isSelectPicModalOpen} title="选择设计图案" >
          <DesignPanel
            onOrderChange={this.handleOrderChange}
            editable={this.state.editable}
            product={product}
            order={this.state.order}
            onSelect={this.handleSelect}
            tabId={this.state.tabId}
          />
        </Modal>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid design-container">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-7 mdc-layout-grid__cell--span-12-tablet">
              {
                product ? (
                  <div className="design-area">
                    <Design
                      onSelectPicture={this.handleSelectPicture}
                      editable={this.state.editable}
                      product={product}
                    />
                  </div>
                ) : null
              }
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-5 mdc-layout-grid__cell--span-12-tablet">
              <div className="right-secion">
                <div>
                  <DesignPanel
                    onOrderChange={this.handleOrderChange}
                    editable={this.state.editable}
                    product={product}
                    order={this.state.order}
                    onSelect={this.handleSelect}
                    tabId={0}
                    isDetailsVisible
                  />
                  <div className="desktop-button">
                    {
                      this.props.cartId ? <button onClick={this.handleUpdateCart} className="mdc-button mdc-button--raised mdc-button--primary button-full-width add-to-cart-button">
                        更新购物车
                      </button> : <button onClick={this.handleAddToCart} className="add-to-cart-button mdc-button mdc-button--raised mdc-button--primary button-full-width">
                        添加到购物车
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="action-area">
            <div className="price-tag">
              ¥100
              <Ratings rating={product.ratings} />
            </div>
            {
              this.props.cartId ? <button type="submit" onClick={this.handleUpdateCart} className="mdc-button mdc-button--raised mdc-button--accent button-full-width add-to-cart-button">
                更新购物车
              </button> : <button onClick={this.handleAddToCart} className="mdc-button mdc-button--raised mdc-button--accent button-full-width add-to-cart-button">
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
