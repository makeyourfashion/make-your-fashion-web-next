import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('viewStore') @observer
export default class Stepper extends React.Component {
  render() {
    const viewStore = this.props.viewStore;
    return (
      <div className="stepper-wrap">
        <style jsx>{`
          .stepper-wrap {
            position: fixed;
            left: 0;
            top: 64px;
            height: 50px;
            width: 100%;
            box-shadow: 0 1px 3px rgba(0,0,0,.14);
            background-color: rgba(255,255,255,1);
            z-index: 1;
          }
          .steps {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            max-width: 1150px;
            margin: auto;
          }
          
          .inactive {
            color: #ccc;
          }
          .step-item {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .line {
            height: 1px;
            width: 100px;
            background-color: #ccc;
            margin: 0 12px 0 12px;
          }
          .inactive .badge {
            background-color: #ccc;
          }
          .badge {
            margin-right: 12px;
          }
        `}</style>
        <div className="steps">
          {
            viewStore.stepNames.slice(0, viewStore.stepNames.length - 1).map((step, index) => (
              <div className={index !== viewStore.step ? 'inactive step-item' : 'step-item'} key={step}>
                <div className="badge">{index + 1}</div>
                {step}
                {
                  index !== viewStore.stepNames.length - 2 ? <div className="line" /> : null
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
