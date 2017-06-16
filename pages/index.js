import Link from 'next/link';
import { Provider } from 'mobx-react';
import Head from '../components/Head';
import AppBar from '../components/AppBar';
import initCartStore from '../stores/cart';
import initIdentityStore from '../stores/identity';
import initProductDetailStore from '../stores/productDetail';

const Landing = () => (
  <div>
    <Head />
    <style jsx>{`
      .landing-background {
        background: blue url("/static/image/background.jpg") no-repeat scroll center;
        height: 500px;
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
      .landing-category {
        max-width: 1000px;
        margin: auto;
      }
      .landing-sub-cat {
        max-width: 750px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .campaign-list {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .campaign-card {
        width: 49%;
        height: 400px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: 20px;
      }
      @media (max-width: 600px) {
        .campaign-card {
          width: 100%;
          height: 300px;
        }
      }
      .campaign1 {
        background-image: url('//image.spreadshirtmedia.com/content/t_std/f_auto/cms/startpage/tiles/men_us_1609');
      }
      .campaign2 {
        background-image: url('//s7.jcrew.com/is/image/jcrew/2017jul_hp1_w_topsearrings?wid=596&fmt=jpeg&qlt=80&resMode=sharp');
      }
      .campaign3 {
        background-image: url('https://upload.wikimedia.org/wikipedia/zh/3/3c/%E6%98%9F%E7%90%83%E5%A4%A7%E6%88%B0%EF%BC%9A%E5%8E%9F%E5%8A%9B%E9%87%8B%E6%94%BE_II.jpeg');
      }

      .campaign4 {
        background-image: url('http://a.espncdn.com/photo/2016/0602/nba_0602nbaplayoffs_1296x518.jpeg');
      }

      .campaign5 {
        background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFPeMZlR0dPU_kfSrAtdGG2MIg6r4ZpNBbX3B_dtj-hDAxufN');
      }

      .campaign6 {
        background-image: url('http://www.indiewire.com/wp-content/uploads/2016/07/wonder-woman.jpg');
      }

      .campaign-card-content {
        background: rgba(0, 0, 0, .4);
      }
      .campaign-title {
        text-align: center;
        padding-bottom: 5px;
        border-bottom: 1px solid #dedede;
      }
      .promotion-bar {
        text-align: center;
        background-color: var(--mdc-theme-primary);
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 40px;
        color: #fff;
      }
    `}</style>
    <Provider
      cartStore={initCartStore()}
      identityStore={initIdentityStore()}
      productDetailStore={initProductDetailStore()}
    >
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
                <a className="mdc-button mdc-button--raised mdc-button--accent">设计</a>
              </Link>
              <span style={{ margin: '0 15px 0 15px' }}>或</span>
              <Link prefetch href="/shop?category=2">
                <a className="mdc-button mdc-button--raised mdc-button--accent">购物</a>
              </Link>
            </div>
          </div>
          <h2 className="campaign-title">近期活动</h2>
          <div className="campaign-list landing-category">
            <div className="campaign-card mdc-card--theme-dark campaign1 mdc-card demo-card demo-card--bg-demo">
              <div className="mdc-card__primary campaign-card-content">
                <h1 className="mdc-card__title mdc-card__title--large">父亲节</h1>
              </div>
            </div>
            <div className="campaign-card mdc-card--theme-dark campaign2 mdc-card demo-card demo-card--bg-demo">
              <div className="mdc-card__primary campaign-card-content">
                <h1 className="mdc-card__title mdc-card__title--large">母亲节</h1>
              </div>
            </div>
            <div className="campaign-card mdc-card--theme-dark campaign3 mdc-card demo-card demo-card--bg-demo">
              <div className="mdc-card__primary campaign-card-content">
                <h1 className="mdc-card__title mdc-card__title--large">星球大战</h1>
              </div>
            </div>
            <div className="campaign-card mdc-card--theme-dark campaign4 mdc-card demo-card demo-card--bg-demo">
              <div className="mdc-card__primary campaign-card-content">
                <h1 className="mdc-card__title mdc-card__title--large">NBA</h1>
              </div>
            </div>
            <div className="campaign-card mdc-card--theme-dark campaign5 mdc-card demo-card demo-card--bg-demo">
              <div className="mdc-card__primary campaign-card-content">
                <h1 className="mdc-card__title mdc-card__title--large">儿童节</h1>
              </div>
            </div>
            <div className="campaign-card mdc-card--theme-dark campaign6 mdc-card demo-card demo-card--bg-demo">
              <div className="mdc-card__primary campaign-card-content">
                <h1 className="mdc-card__title mdc-card__title--large">神奇女侠</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Provider>
  </div>
);

export default Landing;
