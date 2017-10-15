import React from 'react';

export default class TextInput extends React.Component {
  state = {
    focus: false,
  }
  focus() {
    this.input.focus();
  }
  handleFocus = () => {
    this.setState({
      focus: true,
    });
    this.props.onFocus && this.props.onFocus();
  }
  handleBlur = () => {
    this.setState({
      focus: false,
    });
    this.props.onBlur && this.props.onBlur();
  }
  render() {
    const { icon, onChange, onFocus, onBlur, value, type = 'text', displayError, multiline, label = '', ...props } = this.props;
    return (
      <div>
        <style jsx>{`
          .input-border {
            border: 2px solid #dedede;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
          }
          .input-wrapper {
            position: relative;
          }
          textarea, input {
            width: 100%;
            appearance: none;
            background-color: #fff;
            background-image: none;
            border: none
            box-sizing: border-box;
            color: #1f2d3d;
            font-size: inherit;
            line-height: 1;
            outline: 0;
            box-shadow: 0 0 0 30px white inset;
          }
          input {
            padding: 3px 10px;
          }
          textarea {
            padding: 10px 10px;
          }
          input {
            height: 36px;
          }
          .focus {
            border-color: #000;
          }
          .icon {
            position: absolute;
            left: 0;
            top: 50%;
            padding: 0 12px 0 12px;
            border-right: solid 1px #bfcbd9;
            transform: translateY(-50%);
            vertical-align: middle;
          }
          .icon-multi {
            height: 58px;
          }
          .material-icons {
            font-size: 20px;
          }
          .label {
            padding: 6px 10px 6px;
            font-size: 12px;
            font-weight: bold;
            color: #ccc;
          }
          .focus .label {
            color: #212121;
          }
        `}</style>
        <div className={`input-border ${this.state.focus ? 'focus' : ''}`}>
          <div className="label">{label}</div>
          <div className="input-wrapper">
            {
              multiline ? (
                <textarea
                  ref={(r) => { this.input = r; }}
                  rows="4"
                  cols="30"
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onChange={onChange}
                  value={value}
                  type={type || 'text'}
                  {...props}
                />
              ) : (
                <input
                  ref={(r) => { this.input = r; }}
                  value={value}
                  type={type}
                  onFocus={this.handleFocus}
                  onBlur={this.handleBlur}
                  onChange={onChange}
                  {...props}
                />
              )
            }
          </div>
        </div>
        {
          displayError ? (
            <p className="error-msg">
              {displayError}
            </p>
          ) : null
        }
      </div>
    );
  }
}
