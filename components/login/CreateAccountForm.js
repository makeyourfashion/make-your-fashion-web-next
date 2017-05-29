import React from 'react';
import { inject, observer } from 'mobx-react';
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

@inject('identityStore') @observer
export default class CreateAccountForm extends React.Component {
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
          .create-account-button {
            margin-top: 20px;
          }
        `}</style>
        <div className="form-container">
          <h2 className="text-center">还没有账号</h2>
          <form noValidate onSubmit={this.handleCreateAccount}>
            <TextInput
              label="手机号"
              displayError={this.state.phoneError}
              onChange={this.handlePhoneChange}
              onBlur={this.handlePhoneValidation}
              value={this.state.phone}
            />
            <TextInput
              label="密码(至少8位)"
              displayError={this.state.passwordError}
              type="password"
              onChange={this.handlePasswordChange}
              onBlur={this.handlePasswordValidation}
              value={this.state.password}
            />
            <TextInput
              label="确认密码"
              displayError={this.state.passwordConfirmError}
              type="password"
              onChange={this.handlePasswordConfirmChange}
              onBlur={this.handlePasswordConfirmValidation}
              value={this.state.passwordConfirm}
            />
            <button type="submit" className="create-account-button mdc-button mdc-button--raised mdc-button--primary button-full-width">
              创建账号
            </button>
          </form>
        </div>
      </div>
    );
  }
}
