import React from 'react';
import TextInput from '../TextInput';
import { validateEmail, validateZipcode, validatePhone } from '../../utils';

export default class ShippingDetail extends React.Component {
  state = {
    email: '',
    emailError: '',
    name: '',
    nameError: '',
    address: '',
    addressError: '',
    zipcode: '',
    zipcodeError: '',
    phone: this.props.phone,
    phoneError: '',
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  }

  handleEmailValidation = (e) => {
    this.setState({
      emailError: validateEmail(e.target.value),
    });
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleNameValidation = (e) => {
    this.setState({
      nameError: e.target.value ? '' : '请输入姓名',
    });
  }

  handleAddressChange = (e) => {
    this.setState({
      address: e.target.value,
    });
  }

  handleAddressValidation = (e) => {
    this.setState({
      addressError: e.target.value ? '' : '请输入详细地址',
    });
  }

  handleZipcodeChange = (e) => {
    this.setState({
      zipcode: e.target.value,
    });
  }

  handleZipcodeValidation = (e) => {
    this.setState({
      zipcodeError: validateZipcode(e.target.value),
    });
  }

  handlePhoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  handlePhoneValidation = (e) => {
    this.setState({
      phoneError: validatePhone(e.target.value),
    });
  }

  handleNext = (e) => {
    e.preventDefault();
    const errors = {};
    errors.emailError = validateEmail(this.state.email);
    errors.nameError = this.state.name ? '' : '请输入姓名';
    errors.addressError = this.state.address ? '' : '请输入详细地址';
    errors.zipcodeError = validateZipcode(this.state.zipcode);
    errors.phoneError = validatePhone(this.state.phone);

    if (Object.values(errors).filter(v => v).length) {
      this.setState({
        ...errors,
      });
      return;
    }

    const { email, name, address, phone, zipcode } = this.state;
    this.props.onNext({
      email, name, address, phone, zipcode,
    });
  }

  render() {
    return (
      <div className="shipping-form">
        <style jsx>{`
          .shipping-form {
            max-width: 400px;
          }
          .short-input {
            max-width: 200px;
          }
          form {
            margin-bottom: 40px;
          }
          h3 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
        `}</style>
        <div>
          <h3>请输入您的邮寄地址：</h3>
          <form noValidate onSubmit={this.handleNext}>
            <TextInput
              label="邮箱地址："
              displayError={this.state.emailError}
              onChange={this.handleEmailChange}
              onBlur={this.handleEmailValidation}
              value={this.state.email}
            />
            <div className="short-input">
              <TextInput
                label="姓名："
                displayError={this.state.nameError}
                onChange={this.handleNameChange}
                onBlur={this.handleNameValidation}
                value={this.state.name}
              />
            </div>
            <TextInput
              label="详细地址："
              multiline
              displayError={this.state.addressError}
              onChange={this.handleAddressChange}
              onBlur={this.handleAddressValidation}
              value={this.state.address}
            />
            <div className="short-input">
              <TextInput
                label="手机号："
                type="tel"
                displayError={this.state.phoneError}
                onChange={this.handlePhoneChange}
                onBlur={this.handlePhoneValidation}
                value={this.state.phone}
              />
            </div>
            <div className="short-input">
              <TextInput
                label="邮编："
                displayError={this.state.zipcodeError}
                onChange={this.handleZipcodeChange}
                onBlur={this.handleZipcodeValidation}
                value={this.state.zipcode}
              />
            </div>
            <div className="short-input">
              <button type="submit" className="mdc-button mdc-button--raised mdc-button--primary button-full-width">
                下一步
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
