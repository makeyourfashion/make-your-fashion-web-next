import React from 'react';
import Link from 'next/link';
import { inject, observer } from 'mobx-react';
import Menu from './Menu';

@inject('identityStore') @observer
export default class MyAccount extends React.Component {
  logout = async (e) => {
    e.preventDefault();
    await this.props.identityStore.logout();
  }

  render() {
    return (
      <div className="myaccount-button">
        <style jsx>{`
          .account-line1 {
            padding: 10px;
            border-bottom: 1px solid #dedede;
            display: flex;
            justify-content: space-between;
          }
          .myaccount-button {
            margin-right: 5px;
          }
          .account-menu {
            min-width: 250px;
          }
          @media (min-width: 600px) {
            .myaccount-button {
              margin-right: 20px;
            }
          }
        `}</style>
        <Menu label="我的帐户">
          <div className="account-menu">
            <div className="account-line1">
              <div>
                你好，{
                  this.props.identityStore.name
                }
              </div>
              <div>
                <a onClick={this.logout} href="/api/logout">退出</a>
              </div>
            </div>
            <ul className="mdc-list mdc-list--dense">
              <li className="mdc-list-item">
                <Link href="/account/history">
                  <a>我的订单</a>
                </Link>
              </li>
              <li className="mdc-list-item">
                <Link href="/account/details">
                  <a>我的账号</a>
                </Link>
              </li>
            </ul>
          </div>
        </Menu>
      </div>
    );
  }
}
