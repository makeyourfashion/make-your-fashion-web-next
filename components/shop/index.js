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
          }
          .product-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
          }
        `}</style>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-2">
              <h1>{this.props.productStore.getCategory(+this.props.category).name}</h1>
              <div className="label">类别</div>
              <ul>
                {
                  this.props.productStore.categories.slice().map(cat => (
                    <li key={cat.id}>
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
              <div className="label">过滤器</div>
              <ul>
                {
                  this.props.productStore.getSubCategories(this.props.category).map(cat => (
                    <li key={cat.id}>
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
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-10 product-list">
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
        <Footer />
      </div>
    );
  }
}
