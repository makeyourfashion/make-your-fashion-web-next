import React from 'react';
import { range } from 'lodash';
import { inject, observer } from 'mobx-react';
import { SelectField, SelectItem } from '../SelectField';

@inject('designStore') @observer
export default class SelectQtyAndSize extends React.Component {
  handleSelectQty = (value) => {
    this.props.onOrderChange({
      ...this.props.order,
      qty: value,
    });
  }

  handleSelectSize = (value) => {
    this.props.onOrderChange({
      ...this.props.order,
      size: value,
    });
  }

  render() {
    const product = this.props.product;
    return (
      <div className="details-wrapper">
        <style jsx>{`
          .select-list {
            margin-bottom: 2.5rem;
          }
          .form-field > div {
            margin: 20px 0 20px;
          }
          .select-size-label {
            display: flex;
            justify-content: space-between;
          }
          .select-size-label a {
            color: #000;
          }
        `}</style>
        <form noValidate>
          <div className="form-field select-list">
            {
              product.sizes ? (
                <div>
                  <label htmlFor="select-size">
                    <div className="select-size-label">
                      <div>选择尺码：</div>
                      <a href="#size-chart">尺码表</a>
                    </div>
                    <SelectField
                      id="select-size"
                      value={this.props.order.size}
                      onChange={this.handleSelectSize}
                    >
                      {
                        product.sizes.split(',').map(n =>
                          <SelectItem key={n} value={n}>{n}</SelectItem>,
                        )
                      }
                    </SelectField>
                  </label>
                  <div className="error-msg">{this.props.order.sizeError}</div>
                </div>
              ) : null
            }
            <div>
              <label htmlFor="select-size">
                选择数量：
                <SelectField
                  id="select-size"
                  value={this.props.order.qty}
                  onChange={this.handleSelectQty}
                >
                  {
                    range(1, 12).map(n =>
                      <SelectItem key={n} value={n}>{n}</SelectItem>,
                    )
                  }
                </SelectField>
              </label>
              <div className="error-msg">{this.props.order.qtyError}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
