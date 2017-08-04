import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { MDCTemporaryDrawer } from '@material/drawer/dist/mdc.drawer';
import ShoppingCart from './ShoppingCart';
import MyAccount from './MyAccount';

@inject('identityStore', 'productStore') @observer
export default class MAppBar extends React.Component {
  componentDidMount() {
    this.drawer = new MDCTemporaryDrawer(this.drawerDom);
    this.props.productStore.fetchCategories();
  }

  toggleDrawer = () => {
    this.drawer.open = !this.drawer.open;
  }

  render() {

    return (
      <div className="appbar-wrapper" ref={(r) => { this.root = r; }}>
        <style jsx>{`
          .app-bar {
            border-bottom: 1px solid #dedede;
            width: 100%;
            position: fixed;
            top: 2px;
            left: 0;
            z-index: 2;
            background-color: rgba(253,253,249, 1);
          }
          .app-bar.transparent {
            background-color: rgba(253,253,249, 0);
            border-bottom: none;
          }
          
          @media (max-width: 600px) {
            :global(.container) {
              margin-top: 46px !important;
            }
          }
          .nav-tab {
            z-index: 99999;
          }
          .title {
            font-size: 1.1rem;
            font-weight: 500;
            letter-spacing: 0.1rem;
            color: #000;
          }
          .title.transparent {
            color: #000;
          }
          .mdc-temporary-drawer__header-content .title {
            color: #fff;
            font-weight: 600;
          }
          .login-button {
            margin-right: 20px;
          }
          .login-button {
            color: #000;
          }
          .align-center {
            align-items: center;
          }
          .top-bar {
            height: 2px;
            position: fixed;
            top: 0px;
            left: 0;
            width: 100%;
            z-index: 9;
            background-color: #000;
          }
          .menu-button {
            background: none;
            border: none;
            width: 24px;
            height: 24px;
            padding: 0;
            margin: 0;
            margin-right: 24px;
            box-sizing: border-box;
          }
          .menu-button.transparent {
            color: #000;
          }
          .mdc-temporary-drawer__header-content {
            border-bottom: solid 1px #ccc;
            background: url("//makeyourfashion.oss-cn-shanghai.aliyuncs.com/23e8a0f3-e0e7-4db8-bcb2-9f1111103025-background.jpg") no-repeat scroll center;
            background-size: 100% auto;
          }
          .label {
            padding: 16px;
          }
          .mdc-list-item:last-child {
            border-bottom: solid 1px #ccc;
          }
        `}</style>
        <aside ref={(r) => { this.drawerDom = r; }} className="mdc-temporary-drawer mdc-typography">
          <nav className="mdc-temporary-drawer__drawer">
            <header className="mdc-temporary-drawer__header">
              <div className="mdc-temporary-drawer__header-content">
                <Link prefetch href="/">
                  <a className="title">
                    意栈网
                  </a>
                </Link>
              </div>
            </header>
            <div className="mdc-temporary-drawer__content">
              <nav className="mdc-list">
                <Link prefetch href="/shop?category=2">
                  <a
                    className={`mdc-list-item ${
                      typeof window !== 'undefined' && window.location.pathname.startsWith('/shop') ? 'mdc-temporary-drawer--selected' : ''
                    }`}
                  >购物</a>
                </Link>
                <Link prefetch href="/create?product=1">
                  <a
                    className={`mdc-list-item ${
                      typeof window !== 'undefined' && window.location.pathname.startsWith('/create') ? 'mdc-temporary-drawer--selected' : ''
                    }`}
                  >设计</a>
                </Link>
                <Link prefetch href="/admin/designs">
                  <a
                    className={`mdc-list-item ${
                      typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') ? 'mdc-temporary-drawer--selected' : ''
                    }`}
                  >销售</a>
                </Link>
              </nav>
              <div className="mdc-temporary-drawer__toolbar-spacer" />
              <div className="label">分类：</div>
              <nav className="mdc-list">
                {
                  this.props.productStore.categories.values().map(cat => (
                    cat.name && <Link prefetch key={cat.id} href={`/shop?category=${cat.id}`}>
                      <a className="mdc-list-item">{cat.name}</a>
                    </Link>
                  ))
                }
              </nav>
            </div>
            
          </nav>
        </aside>
        <div className={`app-bar ${this.props.transparent ? 'transparent' : ''}`}>
          <div className="top-bar" />
          <div className="mdc-toolbar__row">
            <div className="mdc-toolbar__section align-center">
              <button onClick={this.toggleDrawer} className={`menu-button material-icons ${this.props.transparent ? 'transparent' : ''}`}>menu</button>
              <Link prefetch href="/">
                <a className={`title ${this.props.transparent ? 'transparent' : ''}`}>
                  意栈网
                </a>
              </Link>
            </div>
            <div className="mdc-toolbar__section left-place-holder" />
            <div className="mdc-toolbar__section align-center mdc-toolbar__section--align-end" data-badge="1">
              {
                this.props.identityStore.isLoggedIn ? <MyAccount transparent={this.props.transparent} />
                  : <Link prefetch href="/login">
                    <a className={`login-button ${this.props.transparent ? 'transparent' : ''}`}>登陆</a>
                  </Link>
              }
              <ShoppingCart />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
