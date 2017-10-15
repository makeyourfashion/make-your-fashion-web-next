import React from 'react';
import { func, string, oneOf, number } from 'prop-types';
import ClickOutside from 'react-click-outside';

class SelectFieldComponent extends React.Component {
  state = {
    open: false,
  }

  getChildContext() {
    return {
      onSelect: this.handleSelect,
      value: this.props.value,
    };
  }

  handleClickOutside = () => {
    this.setState({
      open: false,
    });
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  handleSelect = (value) => {
    this.props.onChange(value);
    this.setState({
      open: false,
    });
  }

  render() {
    const { label, children, value } = this.props;
    const open = this.state.open;
    return (
      <div
        className={`select-border ${this.state.open ? 'open' : ''}`}
        onClick={this.handleClick}
        role="listbox"
        tabIndex="0"
      >
        <style jsx>{`
          .select-border {
            border: 2px solid #dedede;
            background-color: #fff;
            max-height: 100%;
          }
          .select-border:focus {
            border-color: #000;
          }
          .select-border.open {
            border-color: #000;
          }
          .label {
            padding: 6px 10px 6px;
            font-size: 12px;
            font-weight: bold;
            color: #ccc;
          }
          .select-border:focus .label {
            color: #212121;
          }
          .link-button {
            color: #000;
          }
          .menu-wrapper {
            position: relative;
          }
          .select {
            width: 100%;
            box-sizing: border-box;
            color: #1f2d3d;
            font-size: inherit;
            line-height: 1;
            outline: 0;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            padding: 3px 10px;
            height: 36px;
            display: flex;
            align-items: center;
          }
          .icon {
            position: absolute;
            right: 10px;
            top: 50%;
            transition: transform 0.3s ease-in-out;
            transform: rotate(0deg) translateY(-50%);
          }
          .icon.open {
            transform:  translateY(-50%) rotate(180deg);
            transition: transform 0.3s ease-in-out;
          }
          .menu-items {
            border: 1px solid #000;
            background-color: rgba(255,255,255,1);
            position: absolute;
            left: -2px;
            top: 42px;
            width: 100%;
            z-index: 2001;
            border-radius: 0;
            border-width: 2px;
          }
        `}</style>
        <div className="label">{label}</div>
        <div className="menu-wrapper">
          <div className="select">
            {value}
          </div>
          <div className={`icon ${this.state.open ? 'open' : ''}`}><i className="material-icons">keyboard_arrow_down</i></div>
          {
            open ? (
              <div className="menu-items">
                <ul>
                  {children}
                </ul>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

SelectFieldComponent.childContextTypes = {
  onSelect: func,
  value: oneOf(string, number),
};

function handleClick(e, context) {
  const value = e.target.closest('li').getAttribute('data-value');
  context.onSelect(value);
}

function SelectItem({ children, value }, context) {
  return (
    <li
      onClick={e => handleClick(e, context)}
      data-value={value}
      role="option"
      aria-selected={value == context.value}
      className={value == context.value ? 'active' : ''}
    >
      <style jsx>{`
        li {
          padding: 8px 10px;
        }
        li.active {
          background-color: #dedede;
        }
        li: hover {
          cursor: pointer;
        }
      `}</style>
      {children}
    </li>
  );
}

SelectItem.contextTypes = {
  onSelect: func,
  value: oneOf(string, number),
};

const SelectField = ClickOutside(SelectFieldComponent);

export { SelectField, SelectItem };
