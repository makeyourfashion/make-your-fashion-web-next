import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import Link from 'next/link';
import withLayout from '../Layout';
import TextInput from '../TextInput';
import { validatePhone, validatePassword } from '../../utils';

function validatePasswordConfirm(passwordConfirm, password) {
  let error = '';
  if (!passwordConfirm) {
    error = '请确认密码';
  } else if (passwordConfirm !== password) {
    error = '请匹配当前密码';
  }

  return error;
}

@withLayout
@inject('identityStore') @observer
export default class LoginView extends React.Component {
  state = {
    phone: '',
    password: '',
    passwordConfirm: '',
    phoneError: '',
    passwordError: '',
    passwordConfirmError: '',
  }

  handleCreateAccount = async (e) => {
    e.preventDefault();
    const { phone, password, passwordConfirm } = this.state;
    const errors = {
      phoneError: validatePhone(phone),
      passwordError: validatePassword(password),
      passwordConfirmError: validatePasswordConfirm(password, passwordConfirm),
    };
    this.setState(errors);
    if (!errors.phoneError && !errors.passwordError && !errors.passwordConfirmError) {
      await this.props.identityStore.createAccount({
        phone,
        password,
        passwordConfirm,
      });
      if (!this.props.identityStore.error) {
        Router.push(this.props.redirect || '/');
      }
    }
  }

  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  handlePhoneValidation = (e) => {
    const phoneError = validatePhone(e.target.value);
    this.setState({
      phoneError,
    });
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  }

  handlePasswordValidation = (e) => {
    const passwordError = validatePassword(e.target.value);
    this.setState({
      passwordError,
    });
  }

  handlePasswordConfirmChange = (e) => {
    this.setState({
      passwordConfirm: e.target.value,
    });
  }

  handlePasswordConfirmValidation = (e) => {
    const passwordConfirmError = validatePasswordConfirm(e.target.value, this.state.password);
    this.setState({
      passwordConfirmError,
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
          .login-card {
            max-width: 400px;
            background-color: #fff;
            margin: auto;
            margin-top: 20px;
            padding: 20px 20px 40px 20px;
          }
          @media (min-width: 600px) {
            .login-card {
              margin-top: 64px;
            }
          }
        `}</style>
        <div className="container">
          <div className="mk-card login-card">
            <div>
              <div>
                <h2 className="text-center">注册新用户</h2>
                <form noValidate onSubmit={this.handleCreateAccount}>
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
                      label="密码(至少8位)"
                      icon="vpn_key"
                      displayError={this.state.passwordError}
                      type="password"
                      onChange={this.handlePasswordChange}
                      onBlur={this.handlePasswordValidation}
                      value={this.state.password}
                    />
                  </div>
                  <div className="form-field">
                    <TextInput
                      label="确认密码"
                      icon="vpn_key"
                      displayError={this.state.passwordConfirmError}
                      type="password"
                      onChange={this.handlePasswordConfirmChange}
                      onBlur={this.handlePasswordConfirmValidation}
                      value={this.state.passwordConfirm}
                    />
                  </div>
                  <div className="form-field">
                    <Link href="/login">
                      <a className="link-button">已经拥有账号？点击登录</a>
                    </Link>
                  </div>
                  <div className="form-field">
                    <button type="submit" className="mdc-button mdc-button--raised round-button mdc-button--accent button-full-width">
                      创建账号
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
