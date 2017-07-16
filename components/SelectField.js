import React from 'react';
import { MDCSelect } from '@material/select/dist/mdc.select';

class SelectField extends React.Component {
  componentDidMount() {
    const select = new MDCSelect(this.select);
    select.listen('MDCSelect:change', () => {
      this.props.onChange(select.value);
    });
  }

  render() {
    return (
      <div className="mdc-select select-field" ref={(r) => { this.select = r; }} role="listbox" tabIndex="0">
        <style jsx>{`
          .select-field {
            width: 100% !important;
            border: 1px solid #ccc !important;
            padding: 3px 10px 3px 15px;
            background-image: none;
            color: #000;
            position: relative;
            margin-top: 10px;
          }
          .icon-arrow {
            position: absolute;
            right: 10px;
          }
        `}</style>
        <span style={this.props.style} className="mdc-select__selected-text">{this.props.value}</span>
        <span className="icon-arrow">
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: 'block', fill: 'rgb(72, 72, 72)', height: '16px', width: '16px' }}>
            <path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z" />
          </svg>
        </span>
        <div className="mdc-simple-menu mdc-select__menu">
          <ul className="mdc-list mdc-simple-menu__items">
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}

function SelectItem({ children, value }) {
  return (
    <li className="mdc-list-item list-item" role="option" id={value} aria-disabled="true">
      <style jsx>{`
        .list-item {
           min-width: 100px;
        }
      `}</style>
      {children}
    </li>
  );
}

export {
  SelectField,
  SelectItem,
};
