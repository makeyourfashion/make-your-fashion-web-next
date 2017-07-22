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
    autorun(() => {
      if (this.props.designStore.showEditText) {
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
      <div>
        <style jsx>{`
          .details-text-tab {
            border-bottom: 1px solid #dedede;
            margin: auto;
            margin-bottom: 20px;
            width: 100%;
          }
          .mdc-tab {  
            min-width: 0;
          }
          .mdc-tab-bar {
            width: 100%;
            max-width: 600px;
          }
        `}</style>
        <div className="details-text-tab">
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
    );
  }
}
