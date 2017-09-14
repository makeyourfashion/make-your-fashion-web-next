import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import withLayout from '../Layout';
import Carousel from '../Carousel';
import Ratings from '../Ratings';

function handleScroll() {
  window.scrollTo(0, window.innerHeight - 100);
}

const isDesktop = typeof window === 'object' && window.matchMedia('(min-width: 800px)').matches;
console.log(isDesktop);

@withLayout @inject('productStore') @observer
export default class Landing extends React.Component {
  state = {
    transparent: true,
  }

  componentDidMount() {
    this.props.productStore.fetchAllProducts();
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
    const { productStore } = this.props;
    return (
      <div>
        <style jsx>{`
          .container {
            margin: auto;
          }
          .initial-screen {
            display: flex;
            flex-flow: column;
            height: 100vh;
            max-height: 650px;
          }
          .header {
            flex: 0 1 auto;
          }
          .main-content {
            max-width: 1150px;
            margin: auto;
            margin-top: 40px;
          }
          .mdc-layout-grid {
            grid-gap: 0;
          }
          .cat-label {
            margin-bottom: 40px;
            text-align: center;
          }
          .cat-label h3 {
            margin: 20px 0 30px;
          }
          .landing-background {
            width: 100%;
            height: 60vh;
            background: url("/static/image/tshirt-247818_1280.jpg") no-repeat scroll center;
            background-size: 100% auto;
            margin: auto;
            position: relative;
          }
          .categories-container, .landing-background {
            max-width: 1800px;
            margin: auto;
          }
          .categories-container {
            max-width: 1150px;
            padding-bottom: 20px;
          }
          .mdc-layout-grid {
            padding: 0;
          }
          .split-line {
            margin: 40px 0 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #9b9b9b;
          }
          .split-line .line {
            background-color: #ccc;
            width: 47%;
            height: 1px;
          }
          .border-button {
            color: #fff;
            border-color: #fff;
          }
          .split-line .label {
            white-space: nowrap;
          }

          .woman-tee, .man-tee, .phone-case, .campaigh-image {
            background-size: auto 100%;
            margin: auto;
          }
          .woman-tee, .man-tee, .phone-case {
            height: 400px;
          }
          .campaigh-image {
            height: 300px;
          }
          .woman-tee {
            background: url("/static/image/ladies_tshirts.jpg") no-repeat scroll center;
            background-size: auto 100%;
          }
          .man-tee {
            background: url("/static/image/mens_tshirts.jpg") no-repeat scroll center;
            background-size: auto 100%;
          }
          .phone-case {
            background: url("/static/image/mobile-phone-1861020_1280.jpg") no-repeat scroll center;
            background-size: auto 100%;
          }
          .description {
            font-size: 11px !important;
          }
          .welcome {
            position: absolute;
            color: #fff;
            text-align: center;
            width: 100%;
            bottom: 50%;
            transform: translateY(50%);
          }
          .landing-background h2 {
            text-shadow: 0 0 10px rgba(20,20,20,.7);
            font-size: 1.8em;
            font-weight: 500;
            color: rgba(255,235,59, 0.95);;
          }
          .landing-background h1 {
            text-shadow: 0 0 10px rgba(20,20,20,.7);
            font-size: 2.2em;
            font-weight: bold;
            margin-bottom: 50px;
            color: rgba(255,235,59, 0.95);;
          }

          .campaign-list {
            padding-bottom: 20px;
            margin-bottom: 10px;
          }

          .campaign-card {
            display: inline-block;
            margin-bottom: 5px;
            width: calc(20% - 10px);
            position: relative;
            margin: 2px 9px 2px 1px;
            height: 220px;
          }

          .campaign-img {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
          }
          .img-wrapper {
            height: 100%;
            width: 100%;
            overflow: hidden;
            display: block;
          }
          .design-img {
            background-size: cover;
            background-repeat: no-repeat;
            height: 100%;
            width: 100%;
          }
          @media (min-width: 600px) {
            .landing-background {
              margin-top: 84px;
            }
            .campaign-img {
              transition: all 0.45s;
            }
            .campaign-img:hover {
              transform: scale(1.1);
            }
            .expand-icon {
              display: none;
            }
          }

          @media (max-width: 600px) {
            .landing-background {
              height: 100vh;
              background-size: auto 100%;
            }
            .woman-tee, .man-tee {
              background-size: auto 100%;
            }
            .container {
              margin-top: 0 !important;
            }
            .expand-icon {
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%) scaleX(1.5);
              color: #fff;
              background-color: rgba(0,0,0,0);
            }
            .campaign-card {
              width: 49%;
              margin-right: 2%;
              height: 190px;
            }
          }

          .campaign-card-content {
            background: rgba(0, 0, 0, .4);
          }
          .campaign-title {
            padding-bottom: 5px;
            font-size: 1.3em;
          }
          .action-button {
            height: 48px;
            padding: 6px 40px 0px 40px;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.7s ease;
            background-color: rgba(255,235,59, 0.95);
          }
          .action-button:hover {
            background-color: #fff;
            color: #000;
          }
          .campaign-card .details {
            position: absolute;
            bottom: 0;
            left: -1px;
            width: 96%;
            background: rgba(0, 0, 0, .4);
            padding: 5% 0 5% 5%;
          }
          .details h4 {
            color: #fff;
            text-align: center;
            margin: 5px 0 5px 0;
          }
          .details div {
            font-size: 13px;
            color: #ccc;
          }
          .campaign-list-line1 {
            max-width: 1150px;
            width: 100%;
            left: 50%;
            transform: translate(-50%, 50%);
            padding: 5px 10px 5px 10px;
            background-color: rgba(255,255,255,1);
            margin: auto;
            position: absolute;
            bottom: 0;
          }
          .campaign-list-line1 .campaign-card2 {
            height: 120px;
            display: inline-block;
            width: calc(20% - 10px);
            position: relative;
            margin: 2px 9px 2px 1px;
          }
          @media (max-width: 600px) {
            .campaign-list-line1 {
              transform: translate(-50%, 0);
            }
            .campaign-card2 {
              height: 70px !important;
              width: calc(33% - 10px) !important;
            }
            .categories-container {
              margin-top: 50px;
            }
          }
          .campaign-card2 .details {
            position: absolute;
            bottom: 0;
            left: -1px;
            width: 100%;
            background: rgba(0, 0, 0, .4);
            padding: 5% 0 5% 5%;
            padding: 0;
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
          .campaign-title span {
            font-size: 13px;
            color: #9b9b9b;
            padding-left: 10px;
            font-weight: 300;
          }
          .rating :global(.ratings-list) {
            transform: scale(0.8);
            margin: auto;
          }
          .line1 {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .campaign-details h3 {
            font-size: 24px;
          }
          .cat-details h3 {
            font-size: 20px;
            font-weight: 400;
          }
          @media (min-width: 800px) {
            .details-container {
              margin: 80px 0 0 -100px !important;
              padding: 0 30px 80px 30px;
              background-color: #fff;
            }
            .campaign-details {
              margin-left: 180px;
            }
          }
          @media (max-width: 800px) {
            .details-container {
              text-align:center;
            }
          }
          .cat-details {
            text-align: center;
          }
          .details-container.inverse {
            margin: 80px -100px 0 0 !important;
            text-align: right;
          }
          .inverse .campaign-details {
            margin: 0 180px 0 0;
          }
          .cat-image {
            z-index: 1;
          }
          .campaign-details p {
            margin: 36px 0 36px 0;
            color: #676767;
          }
          @media (min-width: 450px) {
            .cat-image {
              padding: 0 12px 0 12px;
            }
          }
          .cat-details p {
            color: #676767;
          }
          .mdc-layout-grid > div {
            margin-top: 40px;
          }
        `}</style>
        <div>
          <div className="landing-background">
            <div className="welcome">
              <h1>意栈网</h1>
              <h2>定制你的专属世界</h2>
              <Link href="/create">
                <a className="mdc-button action-button">开始定制</a>
              </Link>
            </div>
            <button onClick={handleScroll} className="icon-button expand-icon">
              <i className="material-icons">expand_more</i>
            </button>
          </div>
          <div className="categories-container">
            <div className="split-line">
              <div className="line" />
              <div className="label">热门主题</div>
              <div className="line" />
            </div>
            {
              productStore.campaigns.values().map((campaign, index) => (
                <div key={campaign.id} className="mdc-layout-grid">
                  <div className={`mdc-layout-grid__cell mdc-layout-grid__cell--span-5 cat-image ${index % 2 === 1 && isDesktop ? 'mdc-layout-grid__cell--order-2' : ''}`}>
                    <div
                      className="campaigh-image"
                      style={{
                        backgroundImage: `url(${campaign.img})`,
                      }}
                    />
                  </div>
                  <div className={`mdc-layout-grid__cell mdc-layout-grid__cell--span-7 details-container  ${index % 2 === 1 && isDesktop ? 'mdc-layout-grid__cell--order-1 inverse' : ''}`}>
                    <div className="campaign-details">
                      <h3>{campaign.name}</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                      <Link href={`/shop?campaign=${campaign.id}`}>
                        <a className="mdc-button action-button">
                          立即前往
                          <i className="material-icons">keyboard_arrow_right</i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            }
            <div className="split-line">
              <div className="line" />
              <div className="label">热门类别</div>
              <div className="line" />
            </div>
            <div className="mdc-layout-grid">
              <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 cat-image">
                <div className="woman-tee" />
                <div className="cat-details">
                  <h3>女士体恤</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                  <Link href="shop?category=2">
                    <a className="mdc-button action-button">
                      立即前往
                      <i className="material-icons">keyboard_arrow_right</i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 cat-image">
                <div className="man-tee" />
                <div className="cat-details">
                  <h3>男士体恤</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                  <Link href="shop?category=1">
                    <a className="mdc-button action-button">
                      立即前往
                      <i className="material-icons">keyboard_arrow_right</i>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 cat-image">
                <div className="phone-case" />
                <div className="cat-details">
                  <h3>手机壳</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                  <Link href="shop?category=4">
                    <a className="mdc-button action-button">
                      立即前往
                      <i className="material-icons">keyboard_arrow_right</i>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-content">
            {/* <div className="line1">
              <h2 className="campaign-title">近期活动</h2>
              <Link href="/shop?campaign=1">
                <a>更多</a>
              </Link>
            </div> */}
            <div className="line1">
              <h2 className="campaign-title">热门单品<span>你的专属定制，一件即可定制</span></h2>
              <Link href="/shop?category=1">
                <a>更多</a>
              </Link>
            </div>
            <div className="campaign-list">
              <Carousel total={5}>
                {
                  productStore.getProductsByCategory('all').map(product => (
                    <div key={product.id} className="mdc-elevation--z1 campaign-card product-card image">
                      <Link key={product.id} href={`/create?product=${product.id}`}>
                        <a className="img-wrapper">
                          <div
                            className="campaign-img"
                            style={{
                              backgroundImage: `url(${product.img})`,
                            }}
                          />
                        </a>
                      </Link>
                      <div className="details">
                        <div className="line1">
                          <h4>{product.name}</h4>
                          <span className="rating"><Ratings rating={product.ratings} /></span>
                        </div>
                        <div className="description">{product.description}</div>
                      </div>
                    </div>
                  ))
                }
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
