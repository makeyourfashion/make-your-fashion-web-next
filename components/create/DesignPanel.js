import React from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import SelectPicture from './SelectPicture';
import EditTextPanel from './EditTextPanel';
import OrderForm from './OrderForm';

@inject('designStore') @observer
export default class DesignPanel extends React.Component {
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
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.order.sizeError !== this.props.order.sizeError)
      || (nextProps.order.qtyError !== this.props.order.qtyError)) {
      this.setState({
        tabIndex: 0,
      });
    }
  }

  handleTabClick = (e) => {
    e.preventDefault();
    this.setState({
      tabIndex: +e.target.getAttribute('href'),
    });
  }

  render() {
    return (
      <div className="design-panel">
        <style jsx>{`
          .details-text-tab {
            border-bottom: 1px solid #dedede;
            margin: auto;
            margin-bottom: 20px;
            width: 100%;
            position: relative;
          }
          .design-panel {
            margin-top: 5%;
          }
          .mdc-tab {  
            min-width: 0;
          }
          .mdc-tab-bar {
            width: 100%;
            max-width: 600px;
          }
          @media (min-width: 600px) {
            .close-button {
              display: none;
            }
          }

          .hide {
            display: none;
          }

          @media (max-width: 600px) {
            .close-button {
              position: absolute;
              top: 0;
              right: 0;
            }
            .tab-with-finish-button {
              width: 75% !important;
              margin-left: 0;
            }
            .close {
              max-height: 46px !important;
              overflow: hidden !important;
            }
            .design-panel {
              max-height: 40%;
            }
            .open {
              margin-top: -50px !important;
            }
            .mobile-button {
              position: absolute;
              top: 0;
              left: 75%;
              width: 25%;
            }
            .mdc-tab {
              padding: 0;
            }
            .open .mobile-button {
              display: none !important;
            }
            .icon-button {
              margin-right: 0;
            }
            .mobile-button .add-to-cart-button {
              height: 48px !important;
              font-weight: bold !important;
              width: 100%;
              box-shadow: none !important;
              border-radius: 0;
              min-width: 0 !important;
            }
          }
        `}</style>
        <div
          className="details-text-tab"
        >
          <nav className="mdc-tab-bar">
            {
              this.props.isDetailsVisible ? (
                <a className={`mdc-tab ${this.state.tabIndex === 0 ? 'mdc-tab--active' : ''}`} href="0" onClick={this.handleTabClick}>商品详情</a>
              ) : null
            }
            <Link href="/shop?category=2">
              <a className="mdc-tab" href="0">产品</a>
            </Link>
            <a className={`mdc-tab ${this.state.tabIndex === 2 ? 'mdc-tab--active' : ''}`} href="2" onClick={this.handleTabClick}>图片</a>
            <a className={`mdc-tab ${this.state.tabIndex === 1 ? 'mdc-tab--active' : ''}`} href="1" onClick={this.handleTabClick}>文字</a>
            <span className="mdc-tab-bar__indicator" />
          </nav>
        </div>
        <div>
          {
            (() => {
              if (this.state.tabIndex === 0) {
                return (
                  <OrderForm
                    onOrderChange={this.props.onOrderChange}
                    editable={this.props.editable}
                    product={this.props.product}
                    order={this.props.order}
                  />
                );
              }
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
    );
  }
}
