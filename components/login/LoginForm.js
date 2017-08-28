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
          .mdc-list-item {
            height: inherit;
          }
        `}</style>
        <div>
          <h2 className="text-center">登录账户</h2>
          <form noValidate onSubmit={this.handleLogin}>
            <ul className="mdc-list">
              <li className="mdc-list-item">
                <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">phone</i>
                <div className="form-field-wrapper">
                  <TextInput
                    label="手机号"
                    type="tel"
                    displayError={this.state.phoneError}
                    onChange={this.handlePhoneChange}
                    onBlur={this.handlePhoneValidation}
                    value={this.state.phone}
                  />
                </div>
              </li>
              <li className="mdc-list-item">
                <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">vpn_key</i>
                <div className="form-field-wrapper">
                  <TextInput
                    label="密码"
                    displayError={this.state.passwordError}
                    type="password"
                    onChange={this.handlePasswordChange}
                    onBlur={this.handlePasswordValidation}
                    value={this.state.password}
                  />
                </div>
              </li>
              <li className="mdc-list-item">
                <button onClick={this.props.onRegister} className="link-button">
                  还没有帐号？点击注册
                </button>
              </li>
              <li className="mdc-list-item">
                <button type="submit" className="login-button mdc-button mdc-button--raised mdc-button--accent button-full-width">
                  登录
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
