import React from 'react';
import { inject, observer } from 'mobx-react';
import AppBar from '../../AppBar';
import Footer from '../../Footer';

@inject('identityStore') @observer
export default class HistoryView extends React.Component {

  render() {
    return (
      <div>
        <style jsx>{`
          h1 {
            font-size: 18px;
            letter-spacing: 3px;
            padding-bottom: 5px;
            border-bottom: 2px solid #000;
            margin-bottom: 40px;
          }
          .date {
            font-weight: bold;
          }
          .status {
            font-size: 0.915em;
            display: flex;
            justify-content: space-between;
          }
          .sub-title {
            font-weight: bold;
            padding: 10px 0 10px 0;
            border-bottom: 1px solid #dedede;
          }
          .container {
            max-width: 800px;
          }
          .title {
            margin-top: 40px;
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
            margin-bottom: 10px;
            line-height: 2;
          }
          .product-list {
            display: flex;
            border-bottom: 1px solid #dedede;
          }
          .product-card {
            width: 32%;
            max-width: 350px;
            min-width: 100px;
            padding-right: 10px;
            margin: 10px 0 20px 0;
          }
          @media (max-width: 600px) {
            .product-card {
              width: 48%;
              margin: 10px 0 20px 0;
            }
          }
          .description {
            font-size: 0.915em;
            font-weight: 400;
            margin-top: 10px;
            text-align: center;
          }
          .product-card-image {
            width: 100%;
          }
          .details {
            padding: 0
          }
          .order-summary, .ship-info {
            margin-top: 15px;
            line-height: 2;
            font-size: 0.915em;
          }
          .order-details {
            display: flex;
            justify-content: space-between;
          }
          .order-summary {
            border-bottom: 1px solid #dedede;
            padding-bottom: 5px;
          }
          .total {
            margin-top: 10px;
            font-size: 0.915em;
            font-weight: bold;
          }
          @media (min-width: 800px) {
            .summary-block {
              margin-left: 40px;
            }
          }
        `}</style>
        <AppBar />
        <div className="container">
          <h1>购物历史</h1>
          {
            this.props.identityStore.histories.map((history, i) => (
              <div key={i}>
                <div className="title">
                  <div className="date">{history.date}</div>
                  <div className="status">
                    <div>
                      <span>状态：</span>
                      <span>{history.status}</span>
                    </div>
                    {
                      history.trackNumber ? (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`http://www.sf-express.com/us/en/dynamic_functions/waybill/#search/bill-number/${history.trackNumber}`}
                        >追踪订单</a>
                      ) : null
                    }
                  </div>
                </div>
                <div className="product-list">
                  {
                    history.products.map(({ id, qty, img, name }) => (
                      <div className="product-card" key={id}>
                        <img alt={name} className="product-card-image" src={img} />
                        <div className="description">
                          <div>{name}</div>
                          <div>数量：{qty}</div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="mdc-layout-grid details">
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                    <div>
                      <div className="sub-title">邮寄信息</div>
                      <div className="ship-info">
                        <div>{history.shipmentInfo.address}</div>
                        <div>{history.shipmentInfo.name}</div>
                        <div>{history.shipmentInfo.phone}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6">
                    <div className="summary-block">
                      <div className="sub-title">订单总结</div>
                      <div className="order-summary">
                        <div className="order-details">
                          <div>价格</div>
                          <div>¥{history.paymentInfo.price}</div>
                        </div>
                        <div className="order-details">
                          <div>运费</div>
                          <div>¥{history.paymentInfo.shipFee}</div>
                        </div>
                        <div className="order-details">
                          <div>折扣</div>
                          <div>－¥{history.paymentInfo.promotion}</div>
                        </div>
                      </div>
                      <div className="order-details total">
                        <div>总价</div>
                        <div>¥{history.paymentInfo.total}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <Footer />
      </div>
    );
  }
}
