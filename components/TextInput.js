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
            box-shadow: 0 1px 3px 0 #e5e5e5 inset;
            padding: 7px 0px 5px;
            width: 100%;
          }
          .textfield-label {
            font-size: .8em;
            display: block;
            margin-bottom: 2px;
          }
          textarea {
            line-height: 1em;
            letter-spacing: .1em;
            border: 1px solid #ccc;
            box-shadow: 0 1px 3px 0 #e5e5e5 inset;
            padding: 7px 0px 5px;
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
            displayError ? <p className="mdc-textfield-helptext mdc-textfield-helptext--persistent mdc-textfield-helptext--validation-msg">
              {displayError}
            </p> : null
          }
        </div>
      </div>
    );
  }
}
