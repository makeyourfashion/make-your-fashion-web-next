import React from 'react';
import { MDCCheckbox } from '@material/checkbox/dist/mdc.checkbox';

export default class Checkbox extends React.Component {
  componentDidMount() {
    this.checkbox = new MDCCheckbox(this.checkboxDom);
    this.checkbox.checked = this.props.checked;
    this.checkbox.foundation_.adapter_.registerChangeHandler(this.props.onChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.checked !== nextProps.checked) {
      this.checkbox.checked = nextProps.checked;
    }
  }

  componentWillUnmount() {
    this.checkbox.foundation_.adapter_.deregisterChangeHandler(this.props.onChange);
  }

  render() {
    return (
      <div className="mdc-form-field">
        <div ref={(r) => { this.checkboxDom = r; }} className="mdc-checkbox">
          <input
            type="checkbox"
            id={this.props.id}
            className="mdc-checkbox__native-control"
          />
          <div className="mdc-checkbox__background">
            <svg
              className="mdc-checkbox__checkmark"
              viewBox="0 0 24 24"
            >
              <path
                className="mdc-checkbox__checkmark__path"
                fill="none"
                stroke="white"
                d="M1.73,12.91 8.1,19.28 22.79,4.59"
              />
            </svg>
            <div className="mdc-checkbox__mixedmark" />
          </div>
        </div>
        <label htmlFor={this.props.id}>{this.props.children}</label>
      </div>
    );
  }
}
