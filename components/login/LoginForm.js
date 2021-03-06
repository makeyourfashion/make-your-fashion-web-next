import React from 'react';
import { inject, observer } from 'mobx-react';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
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
          .login-button {
            margin-top: 20px;
          }
        `}</style>
        <div className="form-container">
          <h2 className="text-center">已经拥有账号</h2>
          <form noValidate onSubmit={this.handleLogin}>
            <TextInput
              label="手机号"
              type="tel"
              displayError={this.state.phoneError}
              onChange={this.handlePhoneChange}
              onBlur={this.handlePhoneValidation}
              value={this.state.phone}
            />
            <TextInput
              label="密码"
              displayError={this.state.passwordError}
              type="password"
              onChange={this.handlePasswordChange}
              onBlur={this.handlePasswordValidation}
              value={this.state.password}
            />
            <Checkbox checked={this.state.rememberPassword} onChange={this.handleRememberPasswordChange}>记住密码</Checkbox>
            <button type="submit" className="login-button mdc-button mdc-button--raised mdc-button--primary button-full-width">
              登录
            </button>
          </form>
        </div>
      </div>
    );
  }
}
