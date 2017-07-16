import React from 'react';
import { observable, autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import AppBar from '../../AppBar';
import Footer from '../../Footer';
import TextInput from '../../TextInput';
import Snackbar from '../../Snackbar';

@inject('identityStore') @observer
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
            border-bottom: 2px solid #000;
            margin-bottom: 40px;
          }
          .container {
            max-width: 500px;
          }
          .short-input {
            max-width: 500px;
          }
          form {
            margin-bottom: 40px;
          }
          @media (max-width: 600px) {
            .short-input {
              max-width: 100%;
            }
            .save-button {
              width: 100%;
            }
          }
        `}</style>
        <AppBar />
        <div className="container">
          <h1>我的个人信息</h1>
          <form onSubmit={this.handleSave}>
            <div className="short-input">
              <TextInput
                label="姓名："
                onChange={this.handleNameChange}
                value={this.name}
              />
            </div>
            <div className="short-input">
              <TextInput
                label="详细地址："
                multiline
                onChange={this.handleAddressChange}
                value={this.address}
              />
            </div>
            <div className="short-input">
              <TextInput
                label="手机号："
                type="tel"
                onChange={this.handlePhoneChange}
                value={this.phone}
              />
            </div>
            <div className="short-input">
              <TextInput
                label="Email："
                type="email"
                onChange={this.handleEmailChange}
                value={this.email}
              />
            </div>
            <button type="submit" className="mdc-button mdc-button--raised button-full-width mdc-button--primary save-button">
              更新个人信息
            </button>
          </form>
          <Snackbar
            open={this.showSuccessMessage}
            message="成功修改个人信息"
          />
        </div>
        <Footer />
      </div>
    );
  }
}
