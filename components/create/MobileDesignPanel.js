import React from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import SelectPicture from './SelectPicture';
import EditTextPanel from './EditTextPanel';
import OrderForm from './OrderForm';

@inject('designStore') @observer
export default class MobileDesignPanel extends React.Component {
  constructor(props) {
    super(props);
    let currentEditText;
    autorun(() => {
      if (this.props.designStore.showEditText !== currentEditText) {
        currentEditText = this.props.designStore.showEditText;
        this.openTab();
        this.setState({
          tabIndex: 1,
        });
      }
    });
  }

  state = {
    tabIndex: this.props.tabId || 0,
    isMobileOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.order.sizeError !== this.props.order.sizeError)
      || (nextProps.order.qtyError !== this.props.order.qtyError)) {
      this.setState({
        tabIndex: 0,
      });
    }
  }

  handleToggleMobileOpen = () => {
    this.setState({
      isMobileOpen: false,
    });
  }

  openTab = () => {
    this.setState({
      isMobileOpen: true,
    });
  }

  handleTabClick = (e) => {
    e.preventDefault();

    this.setState({
      tabIndex: +e.target.closest('a').getAttribute('href'),
    });
    this.openTab();
  }

  render() {
    return (
      <div>
        <style jsx>{`
          .details {
            margin-top: 20px;
          }
          .m-design-panel {
            max-height: 45%;
            overflow: auto;
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            font-size: 12px;
            background-color: rgba(255, 255, 255, 1);
            border-top: solid 1px #ccc;
            max-height: 40%;
          }
          .m-design-panel > :global(div) {
            width: calc(100% - 10px);
            margin: 0 5px 0 5px;
          }
          .details-text-tab {
            border-bottom: 1px solid #dedede;
            margin: auto;
            width: 100%;
            position: relative;
          }
          .mdc-tab {  
            min-width: 0;
          }
          .mdc-tab-bar {
            width: 100%;
            max-width: 600px;
          }

          .main-content {
            margin-top: 20px;
          }
          nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .bottom-button {
            display: block;
            flex-grow: 1;
            text-align: center;
            min-height: 34px;
            padding-top: 3px;
            color: #000;
            padding-top: 14px;
            font-size: 14px;
            font-weight: 500;
          }

          .bottom-button:not(:last-child) {
            border-right: solid 1px #ccc;
          }

          @media (max-width: 600px) {
            .close-button {
              position: absolute;
              top: 0;
              right: 0;
            }
            
            .tab-with-finish-button {
              width: 70% !important;
              margin-left: 0;
            }
            .close {
              max-height: 46px !important;
              overflow: hidden !important;
            }
            .mobile-button {
              position: absolute;
              top: 0;
              left: 70%;
              width: 30%;
            }
            .mdc-tab {
              padding: 0;
            }
            .icon-button {
              margin-right: 0;
            }
            .product-label {
              margin-top: 3px;
            }
            .mobile-button .add-to-cart-button {
              height: 50px !important;
              font-weight: bold !important;
              width: 100%;
              box-shadow: none !important;
              border-radius: 0;
              min-width: 0 !important;
            }
          }
        `}</style>
        <style jsx global>{`
          @media (max-width: 600px) {
            .m-design-panel .line1 h3 {
              margin: 0;
            }
            .m-design-panel .category-list {
              display: block !important;
              overflow: auto !important;
              white-space: nowrap !important;
            }
            .m-design-panel .category-button {
              margin-right: 0 !important;
            }
            .m-design-panel .picture-list {
              margin-top: 10px !important;
              display: block !important;
              overflow: auto !important;
              white-space: nowrap !important;
            }
            .m-design-panel .line1 :global(div) {
              margin: 5px;
            }
          }
        `}</style>
        <div className="details">
          <OrderForm
            onOrderChange={this.props.onOrderChange}
            editable={this.props.editable}
            product={this.props.product}
            order={this.props.order}
          />
        </div>
        <div className="m-design-panel">
          {
            !this.state.isMobileOpen ? (
              <div>
                <div
                  className="details-text-tab tab-with-finish-button"
                >
                  <nav>
                    <Link href="/shop?category=2">
                      <a className="bottom-button" href="0">
                        产品
                      </a>
                    </Link>
                    <a className="bottom-button" href="2" onClick={this.handleTabClick}>
                      图片
                    </a>
                    <a className="bottom-button" href="1" onClick={this.handleTabClick}>
                      文字
                    </a>
                  </nav>
                </div>
                <div className="mobile-button">
                  {
                    this.props.cartId ? <button onClick={this.props.onUpdateCart} className="mdc-button mdc-button--raised mdc-button--accent button-full-width add-to-cart-button">
                      更新购物车
                    </button> : <button onClick={this.props.onAddToCart} className="add-to-cart-button mdc-button mdc-button--raised mdc-button--accent button-full-width">
                      加入购物车
                    </button>
                  }
                </div>
              </div>
            ) : (
              <div>
                <button onTouchStart={this.handleToggleMobileOpen} onClick={this.handleToggleMobileOpen} className="close-button icon-button">&#10006;</button>
                <div className="main-content">
                  {
                    (() => {
                      if (this.state.tabIndex === 1) {
                        return <EditTextPanel />;
                      }
                      if (this.state.tabIndex === 2) {
                        return <SelectPicture onSelect={this.props.onSelect} />;
                      }
                      return null;
                    })()
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
