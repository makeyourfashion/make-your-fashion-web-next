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
          button {
            margin-top: 20px;
          }
          .mdc-list-item {
            height: inherit;
          }
        `}</style>
        <div className="container">
          <div className="login-container mk-card yz-card">
            <h1>我的个人信息</h1>
            <form onSubmit={this.handleSave}>
              <ul className="mdc-list">
                <li className="mdc-list-item">
                  <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">account_circle</i>
                  <div className="form-field-wrapper">
                    <TextInput
                      label="姓名："
                      onChange={this.handleNameChange}
                      value={this.name}
                    />
                  </div>
                </li>
                <li className="mdc-list-item">
                  <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">location_city</i>
                  <div className="form-field-wrapper">
                    <TextInput
                      label="详细地址："
                      multiline
                      onChange={this.handleAddressChange}
                      value={this.address}
                    />
                  </div>
                </li>
                <li className="mdc-list-item">
                  <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">phone</i>
                  <div className="form-field-wrapper">
                    <TextInput
                      label="手机号："
                      type="tel"
                      onChange={this.handlePhoneChange}
                      value={this.phone}
                    />
                  </div>
                </li>
                <li className="mdc-list-item">
                  <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">email</i>
                  <div className="form-field-wrapper">
                    <TextInput
                      label="Email："
                      type="email"
                      onChange={this.handleEmailChange}
                      value={this.email}
                    />
                  </div>
                </li>
                <li className="mdc-list-item">
                  <button type="submit" className="mdc-button mdc-button--raised round-button button-full-width mdc-button--accent save-button">
                    更新个人信息
                  </button>
                </li>
              </ul>
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
