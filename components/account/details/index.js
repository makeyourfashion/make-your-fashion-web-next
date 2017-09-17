import React from 'react';
import { observable, autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import withLayout from '../../Layout';
import TextInput from '../../TextInput';
import Snackbar from '../../Snackbar';

@withLayout @inject('identityStore') @observer
export default class HistoryView extends React.Component {
  constructor(props) {
    super(props);
    autorun(() => {
      this.name = this.props.identityStore.name;
      this.phone = this.props.identityStore.phone;
      this.address = this.props.identityStore.address;
      this.email = this.props.identityStore.email;
    });
  }
  @observable name = '';
  @observable phone = '';
  @observable address = '';
  @observable email = '';
  @observable showSuccessMessage = false;

  handleNameChange = (e) => {
    this.name = e.target.value;
  }

  handleAddressChange = (e) => {
    this.address = e.target.value;
  }

  handlePhoneChange = (e) => {
    this.phone = e.target.value;
  }

  handleEmailChange = (e) => {
    this.email = e.target.value;
  }

  handleSave = (e) => {
    e.preventDefault();
    const details = {
      name: this.name,
      email: this.email,
      address: this.address,
      phone: this.phone,
    };
    this.props.identityStore.saveAccountDetails(details);
    this.showSuccessMessage = true;
    window.setTimeout(() => {
      this.showSuccessMessage = false;
    }, 4000);
  }

  render() {
    return (
      <div>
        <style jsx>{`
          h1 {
            font-size: 18px;
            letter-spacing: 2px;
            padding-bottom: 5px;
            border-bottom: 1px solid #dedede;
            margin-bottom: 20px;
            text-align: center;
          }
          .login-container {
            max-width: 500px;
            margin: auto;
            margin-top: 64px;
          }
          form {
            margin-bottom: 40px;
          }
          .mdc-list-item {
            height: inherit;
          }
        `}</style>
        <div className="container">
          <div className="login-container mk-card yz-card">
            <h1>我的个人信息</h1>
            <form onSubmit={this.handleSave}>
              <div className="form-field">
                <TextInput
                  label="姓名："
                  icon="account_circle"
                  onChange={this.handleNameChange}
                  value={this.name}
                />
              </div>
              <div className="form-field">
                <TextInput
                  label="详细地址："
                  icon="location_city"
                  multiline
                  onChange={this.handleAddressChange}
                  value={this.address}
                />
              </div>
              <div className="form-field">
                <TextInput
                  label="手机号："
                  icon="phone"
                  type="tel"
                  onChange={this.handlePhoneChange}
                  value={this.phone}
                />
              </div>
              <div className="form-field">
                <TextInput
                  label="Email："
                  icon="email"
                  type="email"
                  onChange={this.handleEmailChange}
                  value={this.email}
                />
              </div>
              <div className="form-field">
                <button type="submit" className="mdc-button mdc-button--raised round-button button-full-width mdc-button--accent save-button">
                  更新个人信息
                </button>
              </div>
            </form>
            <Snackbar
              open={this.showSuccessMessage}
              message="成功修改个人信息"
            />
          </div>
        </div>
      </div>
    );
  }
}
