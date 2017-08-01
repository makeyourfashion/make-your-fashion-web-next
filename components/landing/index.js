import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Head from '../Head';
import AppBar from '../AppBar';
import Footer from '../Footer';
import Carousel from '../Carousel';

function handleScroll() {
  window.scrollTo(0, window.innerHeight - 100);
}

@inject('productStore', 'pictureStore') @observer
export default class Landing extends React.Component {
  state = {
    transparent: true,
  }

  componentDidMount() {
    this.props.productStore.fetchAllProducts();
    this.props.pictureStore.init();
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (document.body.scrollTop > window.innerHeight) {
      if (this.state.transparent) {
        this.setState({
          transparent: false,
        });
      }
    } else if (!this.state.transparent) {
      this.setState({
        transparent: true,
      });
    }
  }

  render() {
    const { productStore, pictureStore } = this.props;
    return (
      <div>
        <Head />
        <style jsx>{`
          .container {
            margin: auto;
          }
          .initial-screen {
            display: flex;
            flex-flow: column;
            height: 100vh;
            max-height: 900px;
          }
          .header {
            flex: 0 1 auto;
          }
          .main-content {
            max-width: 1050px;
            margin: auto;
          }
          .landing-background {
            width: 100%;
            flex: 1 1 auto;
            background: url("//makeyourfashion.oss-cn-shanghai.aliyuncs.com/23e8a0f3-e0e7-4db8-bcb2-9f1111103025-background.jpg") no-repeat scroll center;
            background-size: 100% auto;
            margin: auto;
            position: relative;
            max-width: 1440px;
          }
          .welcome {
            position: absolute;
            color: #fff;
            text-align: center;
            width: 100%;
            bottom: 30%;
            transform: translateY(30%)
          }
          .landing-background h2 {
            text-shadow: 0 0 10px rgba(20,20,20,.7);
            font-size: 2.2em;
            font-weight: bold;
          }

          .campaign-list {
            margin-bottom: 10px;
          }

          .campaign-list:not(:last-child) {
            border-bottom: solid 1px #ccc;
          }
          .campaign-card {
            display: inline-block;
            width: 19.4%;
            margin-right: 1%;
            height: 250px;
            transition: width 0.5s, height 0.5s;
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
            transition: width 1s;
          }
          @media (min-width: 600px) {
            .landing-background {
              margin-top: 30px;
            }
            .campaign-card:hover {
              width: 21%;
            }
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
            padding: 6px 40px 0px 40px;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.7s ease;
          }
          .action-button1 {
            background-color: rgba(255,255,255, 0.9);
            color: #000;
          }
          .action-button2 {
            background-color: rgba(0,0,0, 0.9);
            color: #fff;
          }

          .action-button2:hover {
            background-color: #fff;
            color: #000;
          }
          .action-button1:hover {
            background-color: #000;
            color: #fff;
          }
          .campaign-card h4 {
            text-align: center;
          }
          .promotion-bar {
            text-align: center;
            background-color: #000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 40px;
            color: #fff;
          }
          .expand-icon {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) scaleX(1.5);
            color: #fff;
            background-color: rgba(0,0,0,0);
          }
        `}</style>
        <div>
          <div className="initial-screen">
            <div className="header">
              {/* <div className="promotion-bar">
                <div>开业大吉，全体商品最低八折！</div>
              </div> */}
              <AppBar transparent={this.state.transparent} />
            </div>
            <div className="landing-background">
              <div className="welcome">
                <h2>开启你的时尚之旅</h2>
                <Link href="/create?product=1">
                  <a className="mdc-button action-button action-button2">设计</a>
                </Link>
                <span style={{ margin: '0 15px 0 15px' }}>或</span>
                <Link prefetch href="/shop?category=2">
                  <a className="mdc-button action-button action-button1">购物</a>
                </Link>
              </div>
              <button onClick={handleScroll} className="icon-button expand-icon">
                <i className="material-icons">expand_more</i>
              </button>
            </div>
          </div>
          <div className="container">
            <div className="main-content">
              <h2 className="campaign-title">近期活动</h2>
              <div className="campaign-list">
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
              <div className="campaign-list">
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
              <div className="campaign-list">
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
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
