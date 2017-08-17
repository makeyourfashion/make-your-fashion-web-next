import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import { MDCTemporaryDrawer } from '@material/drawer/dist/mdc.drawer';
import { MDCTabBar } from '@material/tabs/dist/mdc.tabs';
import MyAccount from './MyAccount';
import CartIcon from './CartIcon';

@inject('identityStore', 'productStore') @observer
export default class DeskAppBar extends React.Component {
  componentDidMount() {
    this.drawer = new MDCTemporaryDrawer(this.drawerDom);
    MDCTabBar.attachTo(this.nav);
    this.props.productStore.fetchCategories();
  }

  toggleDrawer = () => {
    this.drawer.open = !this.drawer.open;
  }

  render() {
    return (
      <div>
        <style jsx>{`
          aside {
            margin-top: 64px;
          }
          .mdc-toolbar__row {
            min-height: 64px !important;
          }
          .mdc-tab-bar {
            min-height: 64px;
            height: 64px;
          }

          :global(div.container) {
            margin-top: 64px;
          }

          .app-bar {
            z-index: 99999;
            background-color: rgba(253,253,249, 1);
            position: fixed;
            top: 0;
            left: 0;
            box-shadow: 0 1px 3px rgba(0,0,0,.14);
            width: 100%;
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
          .mdc-temporary-drawer__header-content {
            border-bottom: solid 1px #ccc;
            background: url("//makeyourfashion.oss-cn-shanghai.aliyuncs.com/priscilla-du-preez-228220.jpg") no-repeat scroll center;
            background-size: 100% auto;
          }
          .title {
            font-size: 20px;
            color: #000;
            margin: auto;
            margin-left: 30px;
          }
          .title button {
            vertical-align: middle;
          }
          .title a {
            color: #000;
            vertical-align: middle;
            font-weight: 500;
            letter-spacing: 0.1rem;
          }
          .login-button {
            margin-right: 20px;
          }
          .align-center {
            align-items: center;
          }
          @media (max-width: 600px) {
            .title {
              font-size: 18px;
              margin-left: 15px;
            }
            .top-nav {
              display: none;
            }
            aside {
              margin-top: 55px;
            }
            .mdc-toolbar__row {
              min-height: 55px !important;
            }
            .mdc-tab-bar {
              min-height: 55px;
              height: 55px;
            }
            :global(div.container) {
              margin-top: 55px;
            }
            .promotion-bar {
              height: 2px;
              position: fixed;
              top: 0px;
              left: 0;
              width: 100%;
              z-index: 9999999999999999;
            }
            .promotion-bar div {
              display: none;
            }
          }
        `}</style>
        <div className="app-bar">
          <div className="mdc-toolbar__row">
            <div className="mdc-toolbar__section mdc-toolbar__section--align-start">
              <div className="title">
                <button onClick={this.toggleDrawer} className="menu-button material-icons">menu</button>
                <Link prefetch href="/">
                  <a>
                    意栈网
                  </a>
                </Link>
              </div>
            </div>
            <div className="top-nav">
              <div className="mdc-toolbar__section">
                <nav ref={(r) => { this.nav = r; }} className="mdc-tab-bar nav-tab">
                  <Link prefetch href="/">
                    <a
                      className={`mdc-tab ${
                        typeof window !== 'undefined' && window.location.pathname === '/' ? 'mdc-tab--active' : ''
                      }`}
                    >主页</a>
                  </Link>
                  <Link prefetch href="/shop?category=2">
                    <a
                      className={`mdc-tab ${
                        typeof window !== 'undefined' && window.location.pathname.startsWith('/shop') ? 'mdc-tab--active' : ''
                      }`}
                    >购物</a>
                  </Link>
                  <Link prefetch href="/create?product=1">
                    <a
                      className={`mdc-tab ${
                        typeof window !== 'undefined' && window.location.pathname.startsWith('/create') ? 'mdc-tab--active' : ''
                      }`}
                    >设计</a>
                  </Link>
                  <Link prefetch href="/admin/designs">
                    <a
                      className={`mdc-tab ${
                        typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') ? 'mdc-tab--active' : ''
                      }`}
                    >销售</a>
                  </Link>
                  <span className="mdc-tab-bar__indicator" />
                </nav>
              </div>
            </div>
            
            <div className="mdc-toolbar__section align-center mdc-toolbar__section--align-end" data-badge="1">
              {
                this.props.identityStore.isLoggedIn ? <MyAccount />
                  : <Link prefetch href="/login">
                    <a className="login-button">登陆</a>
                  </Link>
              }
              <CartIcon numOfItems={2} />
            </div>
          </div>
        </div>
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
      </div>
    );
  }
}
