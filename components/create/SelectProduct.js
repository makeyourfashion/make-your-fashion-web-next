import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Carousel from '../Carousel';

@inject('productStore') @observer
export default class SelectProduct extends React.Component {
  state = {
    isLoading: false,
  }

  async componentDidMount() {
    const productStore = this.props.productStore;
    await productStore.fetchCategories();
    const catId = productStore.categories.values()[1].id;
    this.setState({
      activeCategory: catId,
    });
    await this.props.productStore.fetchProcutsByCategory(catId);
    this.forceUpdate();
  }

  handleClick = async (e) => {
    e.preventDefault();
    const categoryId = e.target.getAttribute('href');
    this.setState({
      activeCategory: categoryId,
      isLoading: true,
    });
    await this.props.productStore.fetchProcutsByCategory(+categoryId);
    this.setState({
      isLoading: false,
    });
    this.forceUpdate();
  }

  render() {
    const products = this.state.activeCategory
      ? this.props.productStore.getProductsByCategory(this.state.activeCategory) : [];

    return (
      <div className="product-list">
        <style jsx>{`
          .product-list {
            padding-bottom: 20px;
            margin: 20px 0 20px 0;
          }
          .category-list {
            margin: 20px 0 20px;
            display: flex;
            flex-wrap: wrap;
          }
          .product-button {
            margin-right: 10px;
            padding: 0 5px 0 5px;
          } 
          .campaign-card {
            display: inline-block;
            width: 32%;
            margin-right: 1%;
            height: 130px;
          }
          @media (min-width: 600px) and (max-width: 840px) {
            .campaign-card {
              height: 230px;
            }
          }
          @media (max-width: 600px) {
            .product-list {
              padding-bottom: 10px;
              margin: 10px 0 10px 0;
            }
            .category-list {
              margin: 10px 0 10px;
            }
            .campaign-card {
              height: 70px;
              width: 19%;
            }
          }
          .img-wrapper {
            height: 100%;
            width: 100%;
            overflow: hidden;
            display: block;
          }
          .campaign-img {
            width: 100%;
            height: 100%;
            background-size: 100% auto;
            background-repeat: no-repeat;
          }
          .active-product {
            background-color: #00b2a6;
            color: #fff;
          }
          h4 {
            text-align: center;
          }
        `}</style>
        <div className="category-list">
          {
            this.props.productStore.categories.values().slice(1).map(cat => (
              <a
                className={`product-button ${cat.id === +this.state.activeCategory ? 'active-product' : ''}`}
                href={cat.id}
                onClick={this.handleClick}
                key={cat.id}
              >
                {cat.name}
              </a>
            ))
          }
        </div>
        {
          products && products.length ? <Carousel total={4}>
            {
              products.map(product => (
                <div key={product.id} className="campaign-card image">
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
                  <h4>{product.name}</h4>
                </div>
              ))
            }
          </Carousel> : <div style={{ textAlign: 'center' }}>暂无此类商品</div>
        }
      </div>
    );
  }
}
