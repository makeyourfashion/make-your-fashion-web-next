import React from 'react';

export default class Payment extends React.Component {
  state = {}

  render() {
    return (
      <div>
        <style jsx>{`
          .payment-form {
            max-width: 400px;
          }
          .payment-list {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
          }
          .short-input {
            max-width: 200px;
          }
          h3 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
        `}</style>
        <div className="payment-form">
          <h3>支付信息：</h3>
          <div className="payment-list">
            <button className="mdc-button">
              支付宝支付
            </button>
            <button className="mdc-button">
              微信支付
            </button>
          </div>
          <div className="short-input">
            <button onClick={this.props.onNext} className="mdc-button mdc-button--raised mdc-button--primary button-full-width">
              下一步
            </button>
          </div>
        </div>
      </div>
    );
  }
}
