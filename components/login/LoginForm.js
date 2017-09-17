import React from 'react';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import TextInput from '../TextInput';
import { validatePhone } from '../../utils';

function validatePassword(password) {
  return password ? '' : '请输入密码';
}

@inject('identityStore') @observer
export default class LoginForm extends React.Component {
  state = {
    phone: '',
    phoneError: null,
    password: '',
    passwordError: null,
    rememberPassword: true,
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { phone, password, rememberPassword } = this.state;
    const errors = {
      phoneError: validatePhone(phone),
      passwordError: validatePassword(password),
    };
    this.setState(errors);
    if (!errors.phoneError && !errors.passwordError) {
      await this.props.identityStore.login({
        phone,
        password,
        rememberPassword,
      });

      if (!this.props.identityStore.error) {
        this.props.onSuccess();
      }
    }
  }

  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  handlePhoneValidation = (e) => {
    const error = validatePhone(e.target.value);
    this.setState({
      phoneError: error,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  handlePasswordValidation = (e) => {
    const password = e.target.value;
    const error = validatePassword(password);
    this.setState({
      passwordError: error,
    });
  }

  handleRememberPasswordChange = (e) => {
    this.setState({
      rememberPassword: e.target.checked,
    });
  }

  render() {
    return (
      <div>
        <style jsx>{`
          h2 {
            padding-bottom: 12px;
            margin-bottom: 24px;
            border-bottom: solid 1px #dedede;
          }
        `}</style>
        <div>
          <h2 className="text-center">登录账户</h2>
          <form noValidate onSubmit={this.handleLogin}>
            <div className="form-field">
              <TextInput
                label="手机号"
                type="tel"
                icon="phone"
                displayError={this.state.phoneError}
                onChange={this.handlePhoneChange}
                onBlur={this.handlePhoneValidation}
                value={this.state.phone}
              />
            </div>
            <div className="form-field">
              <TextInput
                label="密码"
                icon="vpn_key"
                displayError={this.state.passwordError}
                type="password"
                onChange={this.handlePasswordChange}
                onBlur={this.handlePasswordValidation}
                value={this.state.password}
              />
            </div>
            <div className="form-field">
              <Link href="/createAccount">
                <a className="link-button">还没有帐号？点击注册</a>
              </Link>
            </div>
            <div className="form-field">
              <button type="submit" className="mdc-button mdc-button--raised round-button mdc-button--accent button-full-width">
                登录
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
