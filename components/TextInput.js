import React from 'react';

export default class TextInput extends React.Component {
  focus() {
    this.input.focus();
  }
  render() {
    const { icon, onChange, value, type = 'text', displayError, multiline, label = '', ...props } = this.props;
    return (
      <div>
        <style jsx>{`
          .input-wrapper {
            position: relative;
          }
          textarea, input {
            width: 100%;
            appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #bfcbd9;
            box-sizing: border-box;
            color: #1f2d3d;
            font-size: inherit;
            line-height: 1;
            outline: 0;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
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
          textarea:focus, input:focus {
            border-color: #20a0ff;
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
          .input-padding {
            padding-left: 56px;
          }
          .icon-multi {
            height: 58px;
          }
          .material-icons {
            font-size: 20px;
          }
        `}</style>
        <div className="input-wrapper">
          {
            icon ? <div className={`icon ${multiline ? 'icon-multi' : ''}`}><i className="material-icons">{icon}</i></div> : null
          }
          {
            multiline ? (
              <textarea
                ref={(r) => { this.input = r; }}
                className={icon ? 'input-padding' : null}
                placeholder={label}
                rows="4"
                cols="30"
                onChange={onChange}
                value={value}
                type={type || 'text'}
                {...props}
              />
            ) : (
              <input
                ref={(r) => { this.input = r; }}
                className={icon ? 'input-padding' : null}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={label}
                {...props}
              />
            )
          }
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
