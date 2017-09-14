import React from 'react';
import { inject, observer } from 'mobx-react';
import SelectProduct from './SelectProduct';
import SelectPicture from './SelectPicture';
import EditTextPanel from './EditTextPanel';
import SelectQtyAndSize from './SelectQtyAndSize';

@inject('designStore', 'viewStore', 'productStore') @observer
export default class DesignPanel extends React.Component {
  render() {
    const { productStore, viewStore } = this.props;
    const step = viewStore.step;
    const product = productStore.getProduct(viewStore.productId);
    return (
      <div>
        <style jsx>{`
          .line1 {
            border-bottom: 1px solid #dedede;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
        <div className="line1">
          <h3>{`第${viewStore.step + 1}步： ${viewStore.stepName}`}</h3>
          <div>单价：¥{product.price}</div>
        </div>
        
        {
          (() => {
            if (step === 3) {
              return (
                <SelectQtyAndSize
                  onOrderChange={this.props.onOrderChange}
                  product={this.props.product}
                  order={this.props.order}
                />
              );
            }
            if (step === 2) {
              return <EditTextPanel />;
            }
            if (step === 1) {
              return <SelectPicture onSelect={this.props.onSelect} />;
            }
            if (step === 0) {
              return <SelectProduct />;
            }
            return null;
          })()
        }
      </div>
    );
  }
}
