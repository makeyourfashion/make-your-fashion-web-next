import React from 'react';
import Link from 'next/link';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import ShoppingCart from './ShoppingCart';
import MyAccount from './MyAccount';

@inject('identityStore') @observer
export default class AppBar extends React.Component {
  componentDidMount() {
    this.height = this.nav.offsetTop;
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  @observable sticky = false
  @observable height = 0;

  handleScroll = () => {
    const sticky = window.pageYOffset >= this.height;
    if (this.sticky !== sticky) {
      this.sticky = sticky;
      if (sticky) {
        this.root.nextSibling.style.paddingTop = `${this.nav.offsetHeight + 20}px`;
      } else {
        this.root.nextSibling.style.paddingTop = '20px';
      }
    }
  }

  render() {
    const navStyle = this.sticky ? {
      position: 'fixed',
      top: '0px',
      padding: `0 ${(window.innerWidth - this.nav.offsetWidth) / 2}px 0 ${(window.innerWidth - this.nav.offsetWidth) / 2}px`,
      backgroundColor: 'rgba(253,253,249,1)',
      borderBottom: '1px solid #dedede',
    } : {};
    return (
      <div ref={(r) => { this.root = r; }}>
        <style jsx>{`
          .app-bar {
            border-bottom: 1px solid #dedede;
            width: 100%;
          }
          .nav-tab {
            z-index: 99999;
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
            <div className="mdc-toolbar__section title">意栈网</div>
            <div className="mdc-toolbar__section align-center mdc-toolbar__section--align-end" data-badge="1">
              {
                this.props.identityStore.isLoggedIn ? <MyAccount />
                  : <Link prefetch href="/login">
                    <a className="login-button">登陆</a>
                  </Link>
              }
              <ShoppingCart />
            </div>
          </div>
          <nav style={navStyle} ref={(r) => { this.nav = r; }} className="mdc-tab-bar nav-tab">
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
}

