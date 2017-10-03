import React from 'react';
import { func } from 'prop-types';
import ClickOutside from 'react-click-outside';

class SelectFieldComponent extends React.Component {
  state = {
    open: false,
  }

  getChildContext() {
    return {
      onSelect: this.handleSelect,
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
      <div>
        <div>{label}</div>
        <div className="menu-wrapper">
          <style jsx>{`
            .link-button {
              color: #000;
            }
            .menu-wrapper {
              position: relative;
            }
            .select {
              width: 100%;
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
              padding: 3px 10px;
              height: 36px;
              display: flex;
              align-items: center;
            }
            .select.open {
              border-color: #20a0ff;
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
              border: 1px solid #20a0ff;
              background-color: rgba(255,255,255,1);
              position: absolute;
              left: 0;
              top: 42px;
              width: 99%;
              z-index: 2001;
            }
          `}</style>
          <div className={`select ${this.state.open ? 'open' : ''}`} onClick={this.handleClick}>
            {value}
          </div>
          <div className={`icon ${this.state.open ? 'open' : ''}`}><i className="material-icons">keyboard_arrow_down</i></div>
          {
            open ? (
              <div className="mk-card menu-items">
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
};

function handleClick(e, context) {
  const value = e.target.closest('li').getAttribute('data-value');
  context.onSelect(value);
}

function SelectItem({ children, value }, context) {
  return (
    <li onClick={e => handleClick(e, context)} data-value={value}>
      <style jsx>{`
        li {
          padding: 8px 10px;
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
};

const SelectField = ClickOutside(SelectFieldComponent);

export { SelectField, SelectItem };
