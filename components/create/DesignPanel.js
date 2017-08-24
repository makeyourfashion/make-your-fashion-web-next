import React from 'react';
import { inject, observer } from 'mobx-react';
import SelectProduct from './SelectProduct';
import SelectPicture from './SelectPicture';
import EditTextPanel from './EditTextPanel';
import SelectQtyAndSize from './SelectQtyAndSize';

@inject('designStore', 'viewStore') @observer
export default class DesignPanel extends React.Component {
  render() {
    const viewStore = this.props.viewStore;
    const step = viewStore.step;
    return (
      <div>
        <h3>{`第${viewStore.step + 1}步： ${viewStore.stepName}`}</h3>
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
