import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import AppBar from '../AppBar';
import Footer from '../Footer';

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
    return (
      <div>
        <style jsx>{`
          .label {
            font-weight: bold;
            font-size: 1.1em;
            border-bottom: 2px solid #000;
          }
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
          .category-list {
            margin-bottom: 10px;
          }
        `}</style>
        <AppBar />
        <div className="container">
          <h1 className="category">
            {
              this.props.productStore.getCategory(this.props.category).name
            }
          </h1>
          <h2 className="sub-category">
            {
              this.state.subCat ? this.props.productStore.getSubCategories(this.props.category)
                .find(c => c.id === +this.state.subCat).name : ''
            }
          </h2>
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2 left-menu">
              <div><span className="label">类别</span></div>
              <ul>
                {
                  this.props.productStore.categories.slice().map(cat => (
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
              <div><span className="label">产品分类</span></div>
              <ul>
                {
                  this.props.productStore.getSubCategories(this.props.category).map(cat => (
                    <li className="category-list" key={cat.id}>
                      <a
                        href={`#${cat.id}`}
                        data-catId={cat.id}
                        onClick={this.handleSelectSubCat}
                        style={{
                          textDecoration: 'none',
                          color: `${cat.id === +this.state.subCat ? '#00b2a6' : '#737373'}`,
                        }}
                      >{cat.name}</a>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-10">
              <div className="product-list">
                {
                  this.props.productStore
                    .getProductsByCategory(this.props.category, this.state.subCat)
                    .map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))
                }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
