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
    <Provider
      cartStore={initCartStore()}
      identityStore={initIdentityStore()}
      productDetailStore={initProductDetailStore()}
    >
      <div>
        <AppBar />
        <div className="container">
          <style jsx>
            {
              `.landing-background {
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
              `
            }
          </style>
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
        </div>
        {/*<div className="flexlist landing-category">
          <Card className="landing-category-main">
            <CardMedia
              overlayContainerStyle={styles.mainCategory} overlayContentStyle={styles.mainCategory}
              overlay={<CardTitle title="男士" />}
            >
              <img src="//image.spreadshirtmedia.com/content/t_std/f_auto/cms/startpage/tiles/men_us_1609" />
            </CardMedia>
          </Card>
          <div className="landing-sub-cat">
            <div className="flexlist">
              <Card className="category-card">
                <CardMedia
                  overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="母亲节" />}
                >
                  <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/aum/na/designs/1008125251,width=300,height=300,mother\'s day.png" />
                </CardMedia>
              </Card>
              <Card className="category-card">
                <CardMedia
                  overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="生日特辑" />}
                >
                  <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/aum/na/designs/13348114,width=300,height=300,Birthday.png" />
                </CardMedia>
              </Card>
              <Card className="category-card">
                <CardMedia
                  overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="热销单品" />}
                >
                  <img src="//image.spreadshirtmedia.com/content/t_bgGray-medium,f_auto/aum/na/designs/13114679,width=280,height=280,Favorites.png" />
                </CardMedia>
              </Card>
              <Card className="category-card">
                <CardMedia
                  overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="春季特辑" />}
                >
                  <img src="//image.spreadshirtmedia.com/content/t_bgBlack-medium,f_auto/v5/aum/na/designs/1010210661,width=280,height=280,Spring.png" />
                </CardMedia>
              </Card>
              <Card className="category-card2">
                <CardMedia
                  overlay={<CardTitle style={styles.cardRoot} titleStyle={styles.title} title="手工艺品" />}
                >
                  <img src="//image.spreadshirtmedia.com/content/t_std/f_auto/cms/startpage/tiles/accessories_us_1701" />
                </CardMedia>
              </Card>
            </div>
          </div>
        </div>*/}
      </div>
    </Provider>
  </div>
);

export default Landing;
