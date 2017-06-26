import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { MDCSimpleMenu } from '@material/menu/dist/mdc.menu';

@inject('identityStore') @observer
export default class MyAccount extends React.Component {
  componentDidMount() {
    this.menu = new MDCSimpleMenu(this.menuDom);
    document.querySelector('.mdc-menu-anchor').addEventListener('click', this.handleGotoHistory);
  }

  handleToggleMenu = () => {
    const menu = this.menu;
    if (menu) {
      menu.open = !menu.open;
    }
  }

  handleGotoHistory = (e) => {
    if (e.target.className === 'mdc-list-item') {
      e.preventDefault();
      Router.push(e.target.querySelector('a').getAttribute('href'));
    }
  }

  render() {
    return (
      <div className="mdc-menu-anchor">
        <style jsx>{`
          .account-line1 {
            padding: 10px;
            border-bottom: 1px solid #dedede;
            display: flex;
            justify-content: space-between;
          }
          .mdc-list-item {
            min-width: 200px;
            margin-left: 10px;
            text-align: center;
          }

          @media (max-width: 600px) {
            .icon-button {
              margin-right: 0;
              padding: 2px;
            }
          }
        `}</style>
        <button
          onClick={this.handleToggleMenu}
          className="icon-button"
        >我的帐户</button>
        <div className="mdc-simple-menu" ref={(r) => { this.menuDom = r; }}>
          <div className="account-line1">
            <div>
              你好，{
                this.props.identityStore.name
              }
            </div>
            <div>
              <a href="/login">退出</a>
            </div>
          </div>
          <ul className="mdc-simple-menu__items mdc-list" role="menu" aria-hidden="true">
            <li className="mdc-list-item" role="menuitem">
              <a href="/account/history" onClick={this.handleGotoHistory}>我的订单</a>
            </li>
            <li className="mdc-list-item" role="menuitem">
              <a href="/account/details" onClick={this.handleGotoHistory}>我的账号</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
