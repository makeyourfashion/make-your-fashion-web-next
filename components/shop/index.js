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
      <div className="left-menu">
        <style jsx>{`
          .label {
            font-weight: bold;
            font-size: 1.1em;
            border-bottom: 2px solid #000;
          }
          .category-list {
            margin-bottom: 10px;
          }
          @media (max-width: 599px) {
            .left-menu {
              text-align: center;
            }
          }
        `}</style>
        <div><span className="label">热门主题</span></div>
        <ul>
          {
            this.props.productStore.campaigns.values().map(campaign => (
              <li key={campaign.id} className="category-list">
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
        <div><span className="label">类别</span></div>
        <ul>
          {
            this.props.productStore.categories.values().map(cat => (
              <li className="category-list" key={cat.id}>
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
    );

    return (
      <div>
        <style jsx>{`
          .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
          }
          .category {
            text-align: center;
            font-size: 2em;
            font-weight: 600;
            padding-bottom: 20px;
            border-bottom: 1px solid #dedede;
            letter-spacing: 5px;
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
          }
        `}</style>
        <AppBar />
        <div className="container">
          <h1 className="category">
            {
              this.props.campaign
                ? this.props.productStore.getCampaign(this.props.campaign).name
                : this.props.productStore.getCategory(this.props.category).name
            }
          </h1>
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 mdc-layout-grid__cell--span-12-phone">
              <Desktop>
                {menu}
              </Desktop>
              <Mobile>
                <Collapsible label="过滤器">
                  {menu}
                </Collapsible>
              </Mobile>
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-10">
              {
                (() => {
                  const campaigns = this.props.campaign
                    ? this.props.productStore.getProductsByCampaign(this.props.campaign)
                    : this.props.productStore.getProductsByCategory(this.props.category);
                  if (!campaigns.length) {
                    return <div className="no-products-alert">暂无此类商品，请选择其他类别</div>
                  } else {
                    return (
                      <div className="product-list">
                        {
                          campaigns.map(product => (
                            <ProductCard key={product.id} product={product} />
                          ))
                        }
                      </div>
                    );
                  }
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
