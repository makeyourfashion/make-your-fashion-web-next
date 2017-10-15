import React from 'react';
import range from 'lodash/range';
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
            text-align: right;
          }
        `}</style>
        <form noValidate>
          <div className="form-field select-list">
            {
              product && product.sizes ? (
                <div>
                  <div className="select-size-label">
                    <a className="link-button" href="#size-chart">尺码表</a>
                  </div>
                  <SelectField
                    value={this.props.order.size}
                    label="选择尺码："
                    onChange={this.handleSelectSize}
                  >
                    {
                      product.sizes.split(',').map(n =>
                        <SelectItem key={n} value={n}>{n}</SelectItem>,
                      )
                    }
                  </SelectField>
                  <div className="error-msg">{this.props.order.sizeError}</div>
                </div>
              ) : null
            }
            <div>
              <SelectField
                label="选择数量："
                value={this.props.order.qty}
                onChange={this.handleSelectQty}
              >
                {
                  range(1, 12).map(n =>
                    <SelectItem key={n} value={n}>{n}</SelectItem>,
                  )
                }
              </SelectField>
              <div className="error-msg">{this.props.order.qtyError}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
