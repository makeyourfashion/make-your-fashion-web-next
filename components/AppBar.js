import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import ShoppingCart from './ShoppingCart';

function AppBar() {
  return (
    <div>
      <style jsx>{`
        .app-bar {
          border-bottom: 1px solid #dedede;
          width: 100%;
        }
        .title {
          font-size: 1.25rem;
          font-weight: 500;
        }
        @media (min-width: 600px) {
          .login-button {
            margin-right: 20px;
          }
        }
        .align-center {
          align-items: center;
        }
      `}</style>
      <div className="app-bar">
        <div className="mdc-toolbar__row">
          <div className="mdc-toolbar__section" />
          <div className="mdc-toolbar__section title">T舍网</div>
          <div className="mdc-toolbar__section align-center mdc-toolbar__section--align-end" data-badge="1">
            {
              this.props.identityStore.phone ? <a href="/login" className="login-button">退出</a>
                : <Link prefetch href="/login">
                  <a className="login-button">登陆</a>
                </Link>
            }
            <ShoppingCart />
          </div>
        </div>
        <nav className="mdc-tab-bar">
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
        </nav>
      </div>
    </div>
  );
}

export default inject('identityStore')(observer(AppBar));
