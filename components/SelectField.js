import React from 'react';

class SelectField extends React.Component {
  handleChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <div className="select-field-wrapper">
        <style jsx>{`
            select {
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
              padding: 3px 10px;
              height: 36px;
              transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            }
            select:focus {
              border-color: #20a0ff;
            }

            .select-field-wrapper {
              position: relative;
            }
            .icon-arrow {
              position: absolute;
              right: 10px;
              top: 50%;
              transform: translateY(-50%);
            }
          `}</style>
        <select onChange={this.handleChange} value={this.props.value}>
          <SelectItem />
          {this.props.children}
        </select>
        <span className="icon-arrow">
          <svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style={{ display: 'block', fill: 'rgb(72, 72, 72)', height: '16px', width: '16px' }}>
            <path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z" />
          </svg>
        </span>
      </div>
    );
  }
}

function SelectItem({ children, value }) {
  return (
    <option className="mdc-list-item list-item" id={value} aria-disabled="true">
      <style jsx>{`
        .list-item {
           min-width: 100px;
        }
      `}</style>
      {children}
    </option>
  );
}

export {
  SelectField,
  SelectItem,
};
