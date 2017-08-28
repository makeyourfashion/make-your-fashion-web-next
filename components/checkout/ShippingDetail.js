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
          .shipping-card {
            margin-top: 20px;
          }
          form {
            margin-bottom: 20px;
          }
          h3 {
            border-bottom: 1px solid #dedede;
            padding-bottom: 5px;
          }
          button {
            margin-top: 20px;
          }
          .mdc-list-item {
            height: inherit;
          }
        `}</style>
        <div>
          <h3>请输入您的邮寄地址：</h3>
          <form noValidate onSubmit={this.handleNext}>
            <ul className="mdc-list">
              <li className="mdc-list-item">
                <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">account_circle</i>
                <div className="form-field-wrapper">
                  <TextInput
                    label="姓名："
                    displayError={this.state.nameError}
                    onChange={this.handleNameChange}
                    onBlur={this.handleNameValidation}
                    value={this.state.name}
                  />
                </div>
              </li>
              <li className="mdc-list-item">
                <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">location_city</i>
                <div className="form-field-wrapper">
                  <TextInput
                    label="详细地址："
                    displayError={this.state.addressError}
                    onChange={this.handleAddressChange}
                    onBlur={this.handleAddressValidation}
                    value={this.state.address}
                  />
                </div>
              </li>
              <li className="mdc-list-item">
                <i className="mdc-list-item__start-detail material-icons" aria-hidden="true">phone</i>
                <div className="form-field-wrapper">
                  <TextInput
                    label="手机号："
                    type="tel"
                    displayError={this.state.phoneError}
                    onChange={this.handlePhoneChange}
                    onBlur={this.handlePhoneValidation}
                    value={this.state.phone}
                  />
                </div>
              </li>
              <li className="mdc-list-item">
                <button type="submit" className="mdc-button mdc-button--raised mdc-button--accent button-full-width">
                  下一步
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
