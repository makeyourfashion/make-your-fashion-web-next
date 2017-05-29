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
          }
        `}</style>
        <span style={this.props.style} className="mdc-select__selected-text">{this.props.value}</span>
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
