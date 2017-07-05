import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Head from '../Head';
import AppBar from '../AppBar';
import Footer from '../Footer';

const Landing = ({ productStore }) => (
  <div>
    <Head />
    <style jsx>{`
      .landing-background {
        background: blue url("http://img.lnts.cn/attachments/default/201706/30/DA710j26115499988071bacb5c19370b93561b.jpg") no-repeat scroll center;
        background-size: auto 100%;
        height: 500px;
        margin: auto;
        margin-bottom: 20px;
        position: relative;
        max-width: 1100px;
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
        width: 32%;
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
      .action-button {
        height: 48px;
        padding: 4px 40px 0px 40px;
        color: #fb5900;
        font-size: 16px;
        border: 2px solid;
        font-weight: bold;
      }
      .promotion-bar {
        text-align: center;
        background-color: #fb5900;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 40px;
        color: #fff;
      }
      .bg-title {
        color: #fb5900;
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
            <h2>定制你的专属战衣</h2>
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
          {
            productStore.tags.map(tag => (
              <Link key={tag.id} href={`/shop?tag=${tag.id}`}>
                <a
                  style={{
                    backgroundImage: `url(${tag.img})`,
                  }}
                  className="campaign-card mdc-card--theme-dark mdc-card demo-card demo-card--bg-demo"
                >
                  <div className="mdc-card__primary campaign-card-content">
                    <h1 className="mdc-card__title mdc-card__title--large">{tag.name}</h1>
                  </div>
                </a>
              </Link>
            ))
          }
        </div>
      </div>
      <Footer />
    </div>
  </div>
);

export default inject('productStore')(observer(Landing));
