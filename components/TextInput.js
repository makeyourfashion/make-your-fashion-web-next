import React from 'react';
import { MDCTextfield } from '@material/textfield/dist/mdc.textfield';

export default class TextInput extends React.Component {
  componentDidMount() {
    MDCTextfield.attachTo(this.root);
  }

  render() {
    const { onChange, value, type, displayError, multiline, ...props } = this.props;
    return (
      <div ref={(r) => { this.root = r; }} className={`mdc-textfield mdc-textfield--upgraded ${multiline ? 'mdc-textfield--multiline' : null}`}>
        <style jsx>{`
          .mdc-textfield {
            width: 100%;
            margin: 20px 0 20px 0;
          }
          .mdc-textfield.mdc-textfield--multiline {
            margin-top: 30px;
          }
          .error-msg {
            white-space: nowrap;
          }
          input, textarea {
            width: 100%;
          }
        `}</style>
        {
          multiline ? (
            <textarea value={value} onChange={onChange} {...props} className="mdc-textfield__input" rows="4" cols="40"></textarea>
          ) : (
            <input type={type || 'text'} value={value} onChange={onChange} {...props} className="mdc-textfield__input" />
          )
        }
        {
          displayError ? <p className="error-msg">
            {displayError}
          </p> : null
        }
        <label className={`mdc-textfield__label ${value ? 'mdc-textfield__label--float-above' : ''}`}>
          {this.props.label}
        </label>
      </div>
    );
  }
}
