import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Collapsible extends React.Component {
  state = {
    isVisible: false,
  }

  handleToggle = (e) => {
    e.preventDefault();
    this.setState({
      isVisible: !this.state.isVisible,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <style jsx>{`
          .down-arrow {
            transform:rotate(-180deg);
            vertical-align: middle;
            transition-duration: .3s;
          }

          .up-arrow {
            transform:rotate(0);
            transition-duration: .3s;
          }

          .wrapper {
            overflow: hidden;
            border-bottom: solid 1px #ccc;
            padding-bottom: 10px;
          }

          .collapsible-enter {
            max-height: 0;
          }

          .collapsible-enter.collapsible-enter-active {
            max-height: 800px;
            transition: max-height .5s ease-in;
          }

          .collapsible-leave.collapsible-leave-active {
            max-height: 0;
            transition: max-height .5s ease-out;
          }
          .material-icons {
            vertical-align: middle;
            margin-top: -3px
          }
          a {
            font-weight: bold;
            display: flex;
            justify-content: space-between;
          }
        `}</style>
        <div>
          <a onClick={this.handleToggle}>
            {this.props.label}
            <i className={`material-icons ${this.state.isVisible ? 'down-arrow' : 'up-arrow'}`}>expand_more</i>
          </a>
        </div>
        <ReactCSSTransitionGroup
          transitionName="collapsible"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={50}
        >
          {
            this.state.isVisible ? <div className="children" key="collapse">
              { this.props.children }
            </div> : null
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
