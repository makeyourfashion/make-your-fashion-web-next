import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import AppBar from '../AppBar';
import Mobile from '../Mobile';
import Desktop from '../Desktop';
import Footer from '../Footer';
import Collapsible from '../Collapsible';

@inject('productStore') @observer
export default class ShopView extends React.Component {
  state = {
    subCat: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category !== this.props.category) {
      this.setState({
        subCat: null,
      });
    }
  }

  handleSelectSubCat = (e) => {
    e.preventDefault();
    this.setState({
      subCat: e.target.getAttribute('data-catId'),
    });
  }

  render() {
    const menu = (
      <div>
        <style jsx>{`
          .label {
            border-bottom: 2px solid #000;
          }
          @media (min-width: 600px) {
            .label {
              font-weight: bold;
              font-size: 1.1em;
            }
          }
        `}</style>
        <div className="mdc-list-group">
          <h3 className="mdc-list-group__subheader">热门主题</h3>
          <ul className="mdc-list mdc-list--dense">
            {
              this.props.productStore.campaigns.values().map(campaign => (
                <li key={campaign.id} className="mdc-list-item">
                  <Link href={`/shop?campaign=${campaign.id}`}>
                    <a
                      style={{
                        color: `${campaign.id === +this.props.campaign ? '#00b2a6' : '#737373'}`,
                      }}
                    >{campaign.name}</a>
                  </Link>
                </li>
              ))
            }
          </ul>
          <h3 className="mdc-list-group__subheader">类别</h3>
          <ul className="mdc-list mdc-list--dense">
            {
              this.props.productStore.categories.values().filter(cat => cat.id).map(cat => (
                <li className="mdc-list-item" key={cat.id}>
                  <Link href={`/shop?category=${cat.id}`}>
                    <a
                      style={{
                        color: `${cat.id === +this.props.category ? '#00b2a6' : '#737373'}`,
                      }}
                    >{cat.name}</a>
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );

    let headLine;
    if (this.props.campaign) {
      headLine = this.props.productStore.getCampaign(this.props.campaign).name;
    } else {
      const category = this.props.productStore.getCategory(this.props.category);
      headLine = category ? category.name : null;
    }
    return (
      <div>
        <style jsx>{`
          .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
          }
          .category {
            margin-left: 1.5%;
          }
          .category span {
            color: #ff5a5f;
          }
          @media (max-width: 599px) {
            .category {
              display: none;
            }
          }
          .sub-category {
            text-align: center;
            margin-bottom: 20px;
            font-weight: 400;
            font-size: 1.1em;
            color: #333;
            letter-spacing: 2px;
          }
          .no-products-alert {
            text-align: center;
          }
          .filter {
            font-weight: bold;
            margin: 15px;
          }
        `}</style>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--span-12-phone">
              <Desktop>
                {menu}
              </Desktop>
              <div className="filter">
                <Mobile>
                  <Collapsible label={`过滤器：${headLine}`}>
                    {menu}
                  </Collapsible>
                </Mobile>
              </div>
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-10">
              { headLine ? <h3 className="category"><span>"{ headLine }"</span>搜索结果</h3> : null }
              {
                (() => {
                  const campaigns = this.props.campaign
                    ? this.props.productStore.getProductsByCampaign(this.props.campaign)
                    : this.props.productStore.getProductsByCategory(this.props.category);
                  if (!campaigns.length) {
                    return <div className="no-products-alert">暂无此类商品，请选择其他类别</div>;
                  }
                  return (
                    <div className="product-list">
                      {
                          campaigns.map(product => (
                            <ProductCard key={product.id} product={product} />
                          ))
                        }
                    </div>
                  );
                })()
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
