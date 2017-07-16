import React from 'react';
// import { MDCTextfield } from '@material/textfield/dist/mdc.textfield';

export default class TextInput extends React.Component {
  // componentDidMount() {
  //   MDCTextfield.attachTo(this.root);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.displayError !== this.props.displayError) {
  //     this.input.setCustomValidity(nextProps.displayError);
  //   }
  // }

  render() {
    const { onChange, value, type, displayError, multiline, ...props } = this.props;
    return (
      <div>
        <style jsx>{`
          .text-input {
            margin-bottom: 20px;
          }
          input {
            line-height: 1em;
            letter-spacing: .1em;
            border: 1px solid #ccc;
            padding: 8px 0px 8px 8px;
            box-shadow: none;
            appearance: none;
            border-radius: 0;
            width: 97%;
            font-size: 12px;
            font-weight: 300;
            background-color: #fdfdf9;
          }
          .textfield-label {
            font-size: .8em;
            display: block;
            margin-bottom: 2px;
          }
          textarea {
            width: 97%;
            line-height: 1em;
            letter-spacing: .1em;
            appearance: none;
            border-radius: 0;
            border: 1px solid #ccc;
            box-shadow: none;
            padding: 8px 0px 8px 8px;
            font-size: 12px;
            font-weight: 300;
            background-color: #fdfdf9;
          }
        `}</style>
        <div className="text-input">
          <label>
            <span className="textfield-label">{this.props.label}</span>
            {
              multiline ? <textarea
                rows="4"
                cols="30"
                ref={(r) => { this.input = r; }}
                onChange={onChange}
                value={value}
                type={type || 'text'}
                {...props}
              />
                : <input ref={(r) => { this.input = r; }} onChange={onChange} value={value} type={type || 'text'} {...props} />
            }
          </label>
          {
            displayError ? <p className="error-msg">
              {displayError}
            </p> : null
          }
        </div>
      </div>
    );
  }
}
