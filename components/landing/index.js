import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Head from '../Head';
import AppBar from '../AppBar';
import Footer from '../Footer';
import Carousel from '../Carousel';

@inject('productStore', 'pictureStore') @observer
export default class Landing extends React.Component {
  componentDidMount() {
    this.props.productStore.fetchAllProducts();
    this.props.pictureStore.init();
  }

  render() {
    const { productStore, pictureStore } = this.props;
    return (
      <div>
        <Head />
        <style jsx>{`
          .container {
            max-width: 1050px;
          }
          .landing-background {
            background: grey url("//makeyourfashion.oss-cn-shanghai.aliyuncs.com/23e8a0f3-e0e7-4db8-bcb2-9f1111103025-background.jpg") no-repeat scroll center;
            background-size: auto;
            height: 600px;
            margin: auto;
            margin-bottom: 20px;
            position: relative;
          }
          .welcome {
            position: absolute;
            color: #fff;
            text-align: center;
            width: 100%;
            bottom: 10%;
          }
          .landing-background h2 {
            text-shadow: 0 0 10px rgba(20,20,20,.7);
            font-size: 2.2em;
            font-weight: bold;
          }

          .campaign-list {
            margin-bottom: 10px;
            overflow: hidden;
            white-space: nowrap;
          }

          .campaign-list:not(:last-child) {
            border-bottom: solid 1px #ccc;
          }
          .campaign-card {
            display: inline-block;
            width: 19.4%;
            margin-right: 1%;
            height: 250px;
          }
          .campaign-img {
            background-size: cover;
            background-repeat: no-repeat;
            height: 80%;
            width: 100%;
          }
          .design-img {
            background-size: cover;
            background-repeat: no-repeat;
            height: 100%;
            width: 100%;
          }
          .design-card {
            display: inline-block;
            width: 16%;
            margin-right: 1%;
            height: 170px;
            margin-bottom: 20px;
          }
          @media (max-width: 600px) {
            .landing-background {
              height: 400px;
              background-size: auto 100%;
            }
            .campaign-card {
              width: 49%;
              margin-right: 2%;
              height: 250px;
            }
            .campaign-img {
              height: 70%;
            }
            .design-card {
              width: 33%;
              height: 100px;
            }
          }

          .campaign-card-content {
            background: rgba(0, 0, 0, .4);
          }
          .campaign-title {
            margin-top: 50px;
            padding-bottom: 5px;
            font-size: 1.3em;
            border-bottom: solid 1px #ccc;
          }
          .action-button {
            height: 48px;
            padding: 4px 40px 0px 40px;
            color: #ff5a5f;
            font-size: 16px;
            border: 2px solid;
            font-weight: bold;
          }
          .promotion-bar {
            text-align: center;
            background-color: #ff5a5f;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 40px;
            color: #fff;
          }
          .campaign-card h4 {
            text-align: center;
          }
        `}</style>
        <div>
          <div className="promotion-bar">
            <div>开业大吉，全体商品最低八折！</div>
          </div>
          <AppBar />
          <div className="container">
            <div className="landing-background">
              <div className="welcome">
                <h2>开启你的时尚之旅</h2>
                <Link href="/create?product=1">
                  <a className="mdc-button action-button">设计</a>
                </Link>
                <span style={{ margin: '0 15px 0 15px' }}>或</span>
                <Link prefetch href="/shop?category=2">
                  <a className="mdc-button action-button">购物</a>
                </Link>
              </div>
            </div>
            <h2 className="campaign-title">近期活动</h2>
            <div className="campaign-list landing-category">
              <Carousel total={5}>
                {
                  productStore.campaigns.values().map(campaign => (
                    <div key={campaign.id} className="campaign-card image">
                      <Link key={campaign.id} href={`/shop?campaign=${campaign.id}`}>
                        <a>
                          <div
                            className="campaign-img"
                            style={{
                              backgroundImage: `url(${campaign.img})`,
                            }}
                          />
                        </a>
                      </Link>
                      <h4>{campaign.name}</h4>
                    </div>
                  ))
                }
              </Carousel>
            </div>
            <h2 className="campaign-title">热门单品</h2>
            <div className="campaign-list landing-category">
              <Carousel total={5}>
                {
                  productStore.getProductsByCategory('all').map(product => (
                    <div key={product.id} className="campaign-card image">
                      <Link key={product.id} href={`/create?product=${product.id}`}>
                        <a>
                          <div
                            className="campaign-img"
                            style={{
                              backgroundImage: `url(${product.img})`,
                            }}
                          />
                        </a>
                      </Link>
                      <h4>{product.name}</h4>
                    </div>
                  ))
                }
              </Carousel>
            </div>
            <h2 className="campaign-title">热门设计图片</h2>
            <div className="campaign-list landing-category">
              <Carousel total={6}>
                {
                  pictureStore.designs.values().map(pic => (
                    <div key={pic.id} className="design-card image">
                      <div
                        className="design-img"
                        style={{
                          backgroundImage: `url(${pic.imgUrl})`,
                        }}
                      />
                    </div>
                  ))
                }
              </Carousel>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
