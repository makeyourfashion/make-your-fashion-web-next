import React from 'react';
import { autorun } from 'mobx';
import { inject, observer } from 'mobx-react';
import TextInput from '../TextInput';
import { validatePhone } from '../../utils';

@inject('identityStore') @observer
export default class ShippingDetail extends React.Component {
  static defaultProps = {
    name: '',
    address: '',
    phone: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.identityStore.name,
      nameError: '',
      address: this.props.identityStore.address,
      addressError: '',
      phone: this.props.identityStore.phone,
      phoneError: '',
    };
    autorun(() => {
      this.setState({
        name: this.props.identityStore.name,
        address: this.props.identityStore.address,
        phone: this.props.identityStore.phone,
      });
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
    errors.nameError = this.state.name ? '' : '请输入姓名';
    errors.addressError = this.state.address ? '' : '请输入详细地址';
    errors.phoneError = validatePhone(this.state.phone);

    if (Object.values(errors).filter(v => v).length) {
      this.setState({
        ...errors,
      });
      return;
    }

    const { name, address, phone } = this.state;
    this.props.onNext({
      name, address, phone,
    });
  }

  render() {
    return (
      <div >
        <style jsx>{`
          .short-input {
            max-width: 500px;
          }
          form {
            margin-bottom: 40px;
          }
          h3 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
          }
          @media (max-width: 600px) {
            .short-input {
              max-width: 100%;
            }
          }
        `}</style>
        <div>
          <h3>请输入您的邮寄地址：</h3>
          <form noValidate onSubmit={this.handleNext}>
            <div className="short-input">
              <TextInput
                label="姓名："
                displayError={this.state.nameError}
                onChange={this.handleNameChange}
                onBlur={this.handleNameValidation}
                value={this.state.name}
              />
            </div>
            <div className="short-input">
              <TextInput
                label="详细地址："
                multiline
                displayError={this.state.addressError}
                onChange={this.handleAddressChange}
                onBlur={this.handleAddressValidation}
                value={this.state.address}
              />
            </div>
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
