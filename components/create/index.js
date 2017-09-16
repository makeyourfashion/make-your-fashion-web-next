import React from 'react';
import { inject, observer, Provider } from 'mobx-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { isEmpty, range } from 'lodash';
import Router from 'next/router';
import withLayout from '../Layout';
import Design from './Design';
import Snackbar from '../Snackbar';
import DesignPanel from './DesignPanel';
import Modal from '../Modal';
import Desktop from '../Desktop';
import Mobile from '../Mobile';
import MobileDesignPanel from './MobileDesignPanel';
import { SelectField, SelectItem } from '../SelectField';
import ViewStore from './viewStore';
import Stepper from './Stepper';
import OrderForm from './OrderForm';

function getCanvasImgUrl() {
  const canvas = document.querySelector('canvas');
  const resizedCanvas = document.createElement('canvas');
  const resizedContext = resizedCanvas.getContext('2d');
  resizedCanvas.height = '200';
  resizedCanvas.width = '200';

  resizedContext.drawImage(canvas, 0, 0, 200, 200);
  return resizedCanvas.toDataURL();
}

@withLayout @inject('productStore', 'cartStore', 'identityStore', 'designStore') @observer
export default class CreateView extends React.Component {
  state = {
    isPromptNextOpen: false,
    editable: true,
    showSuccessMessage: false,
    order: {},
    showDesignPanel: true,
  };
  componentDidMount() {
    document.addEventListener('click', this.handleToggleEditable);
    document.addEventListener('touchstart', this.handleToggleEditable);
    if (window.matchMedia('(min-width: 840px)').matches) {
      document.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productId !== this.props.productId) {
      // const designDetail = this.productStore.getProduct(nextProps.productId).designDetail;
      // const textDetail = this.productStore.getProduct(nextProps.productId).textDetail;
      // this.designStore = initDesignStore(nextProps.productId, designDetail, textDetail);
      this.props.designStore.design.productId = nextProps.productId;
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleToggleEditable);
    document.removeEventListener('touchstart', this.handleToggleEditable);
    if (window.matchMedia('(min-width: 840px)').matches) {
      document.removeEventListener('scroll', this.handleScroll);
    }
  }

  getProduct() {
    let productId;
    if (this.props.productId) {
      productId = this.props.productId;
    } else {
      productId = 1;
    }

    return this.props.productStore.getProduct(productId);
  }

  viewStore = new ViewStore(this.props.step, this.props.productId);

  handleSelect = (id, imgUrl) => {
    this.props.designStore.addImage(id, imgUrl);
  }

  handleScroll = () => {
    if (window.pageYOffset < 400) {
      if (!this.state.showDesignPanel) {
        this.setState({
          showDesignPanel: true,
        });
      }
    } else if (this.state.showDesignPanel) {
      this.setState({
        showDesignPanel: false,
      });
    }
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
      if (!e.target.closest('.edit-text-panel')) {
        this.props.designStore.activeTextId = null;
      }
    }
  }

  handleCheckout = () => {
    Router.push('/checkout');
  }

  nextStep = () => {
    if (this.viewStore.step === 3) {
      return this.handleAddToCart(false);
    }
    return this.viewStore.nextStep();
  }

  handleAddToCart = (openModal = true) => {
    const { size, qty } = this.state.order;
    const errors = {};

    if (this.getProduct().sizes && !size) {
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
        isPromptNextOpen: true && openModal,
      });
      return;
    }

    this.setState({
      showSuccessMessage: true,
      isPromptNextOpen: false,
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

  handleOrderChange = (order) => {
    this.setState({
      order,
    });
  }

  closePromptNext = () => {
    this.setState({
      isPromptNextOpen: false,
    });
  }

  render() {
    const product = this.getProduct();
    const viewStore = this.viewStore;
    const step = viewStore.step;

    return (
      <Provider viewStore={this.viewStore} >
        <div className="create-design">
          <Desktop><Stepper /></Desktop>
          <style jsx>{`
            .design-container {
              position: relative;
              border-bottom: solid 1px #dedede;
              max-width: 1400px;
            }

            .create-design :global(.mdc-dialog__surface) {
              max-width: 600px;
            }
            .select-list {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .select-list > div {
              max-width: 400px;
              margin: 20px 0 20px;
              width: 100%;
            }
            .detail-img {
              width: 100%;
              margin-top: 20px;
            }
            .detail-img-list {
              max-width: 840px;
              padding: 0 18px 6px 18px;
              margin: auto;
              margin-top: 12px;
            }
            .title {
              margin: 40px 0 10px 0;
              padding-bottom: 10px;
              border-bottom: solid 1px #dedede;
              font-weight: 500;
            }
            .desktop-button {
              padding-top: 20px;
              border-top: solid 1px #ccc;
              display: flex;
            }
            .desktop-button .add-to-cart-button {
              height: 50px !important;
              font-weight: bold !important;
            }

            .desktop-button button:not(:last-child) {
              margin-right: 20px;
            }
            .design-panel {
              padding: 20px;
              margin-bottom: 20px;
              background-color: #fff;
            }
            @media (min-width: 840px) {
              .design-panel {
                width: 400px;
                max-width: 25%;
                position: fixed;
                top: 100px;
              }
            }
            .panel-container-main {
              height: 55vh;
              max-height: 550px;
              overflow: auto;
            }

            .design-panel-enter {
              opacity: 0.01;
            }

            .design-panel-enter.design-panel-enter-active {
              opacity: 1;
              transition: opacity 500ms ease-in;
            }

            .design-panel-leave {
              opacity: 1;
            }

            .design-panel-leave.design-panel-leave-active {
              opacity: 0.01;
              transition: opacity 500ms ease-in;
            }

            @media (min-width: 600px) {
              .action-area {
                display: none;
              }
              .container {
                margin-top: 80px !important;
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
            }
            .detail {
              max-width: 250px
            }
          `}</style>
          <Modal
            onClose={this.closePromptNext}
            open={this.state.isPromptNextOpen}
            onAccept={this.handleAddToCart}
            title="选择尺码与数量"
          >
            <div className="select-list">
              {
                product.sizes ? (
                  <div>
                    <label htmlFor="select-size">
                      选择尺码：
                      <SelectField
                        id="select-size"
                        value={this.state.order.size}
                        onChange={(value) => {
                          this.handleOrderChange({
                            ...this.state.order,
                            size: value,
                          });
                        }}
                      >
                        {
                          product.sizes.split(',').map(n =>
                            <SelectItem key={n} value={n}>{n}</SelectItem>,
                          )
                        }
                      </SelectField>
                    </label>
                    <div className="error-msg">{this.state.order.sizeError}</div>
                  </div>
                ) : null
              }
              <div>
                <label htmlFor="select-size">
                  选择数量：
                  <SelectField
                    id="select-size"
                    value={this.state.order.qty}
                    onChange={(value) => {
                      this.handleOrderChange({
                        ...this.state.order,
                        qty: value,
                      });
                    }}
                  >
                    {
                      range(1, 12).map(n =>
                        <SelectItem key={n} value={n}>{n}</SelectItem>,
                      )
                    }
                  </SelectField>
                </label>
                <div className="error-msg">{this.state.order.qtyError}</div>
              </div>
            </div>
          </Modal>
          <div className="container">
            <div className="mdc-layout-grid design-container">

              <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-8 mdc-layout-grid__cell--span-12-tablet">
                {
                  product ? (
                    <div className="design-area">
                      <Design
                        editable={this.state.editable}
                        product={product}
                      />
                    </div>
                  ) : null
                }
              </div>
              <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-12-tablet">
                <Desktop>
                  <ReactCSSTransitionGroup
                    transitionName="design-panel"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                  >
                    {
                      this.state.showDesignPanel ? (
                        <div className="mk-card design-panel">
                          <div className="panel-container-main">
                            <DesignPanel
                              onOrderChange={this.handleOrderChange}
                              editable={this.state.editable}
                              product={product}
                              order={this.state.order}
                              onSelect={this.handleSelect}
                              onAddToCart={this.handleAddToCart}
                              isDetailsVisible
                            />
                          </div>
                          <div className="desktop-button">
                            {
                              step > 0 ? <button onClick={viewStore.preStep} className="add-to-cart-button mdc-button--raised mdc-button button-full-width">
                                <i className="material-icons">keyboard_arrow_left</i>
                                {viewStore.preStepName}
                              </button> : null
                            }
                            <button onClick={this.nextStep} className="add-to-cart-button mdc-button mdc-button--raised mdc-button--accent button-full-width">
                              {
                                step === 3 ? '添加至购物车' : `${viewStore.nextStepName}`
                              }
                              <i className="material-icons">keyboard_arrow_right</i>
                            </button>
                          </div>
                        </div>
                      ) : null
                    }
                  </ReactCSSTransitionGroup>
                </Desktop>
              </div>
            </div>
            <Mobile>
              <MobileDesignPanel
                onOrderChange={this.handleOrderChange}
                editable={this.state.editable}
                product={product}
                order={this.state.order}
                onSelect={this.handleSelect}
                onAddToCart={this.handleAddToCart}
                showFinishButton
                isDetailsVisible
              />
            </Mobile>
            <div className="mk-card detail-img-list">
              <h3 className="title">商品详情：</h3>
              <div className="detail">
                <OrderForm
                  product={product}
                  order={this.state.order}
                />
              </div>
              {
                product.productType === 'apparel' ? (
                  <div>
                    <img className="detail-img" src="/static/image/1.jpg" alt="img" />
                    <img className="detail-img" src="/static/image/2.jpg" alt="img" />
                    <img className="detail-img" src="/static/image/3.jpg" alt="img" />
                    <img id="size-chart" className="detail-img" src="/static/image/4.png" alt="img" />
                    <img className="detail-img" src="/static/image/5.jpg" alt="img" />
                    <img className="detail-img" src="/static/image/6.jpg" alt="img" />
                  </div>
                ) : null
              }
            </div>
            <Snackbar
              open={this.state.showSuccessMessage}
              onAction={this.handleCheckout}
              actionText="结账"
              message="成功添加至购物车"
            />
          </div>
        </div>
      </Provider>
    );
  }
}
