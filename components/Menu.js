import React from 'react';

export default class Menu extends React.Component {
  state = {
    open: false,
  }
  handleHover = () => {
    this.setState({
      open: true,
    });
  }

  handleLeave = () => {
    this.setState({
      open: false,
    });
  }
  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const { label, children } = this.props;
    const open = this.state.open;
    return (
      <div onTouchStart={this.handleClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleLeave} className="menu-wrapper">
        <style jsx>{`
          .link-button {
            color: #000;
          }
          .menu-wrapper {
            positon: relative;
          }
          .menu-items {
            z-index: 1;
            background-color: rgba(255,255,255,1);
            position: absolute;
            right: 0;
          }
        `}</style>
        <button className="link-button">{label}</button>
        {
          open ? (
            <div className="menu-items mk-card">
              {children}
            </div>
          ) : null
        }
      </div>
    );
  }
}
