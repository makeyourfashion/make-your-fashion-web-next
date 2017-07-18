import React from 'react';

export default class Carousel extends React.Component {
  state = {
    currentIndex: 0,
    total: 1,
  }

  componentDidMount() {
    const totalWidth = this.container.offsetWidth;
    const image = this.container.querySelector('.image');
    const elWidth = image ? image.offsetWidth : 1;
    this.setState({
      total: totalWidth / elWidth,
    });
  }

  componentWillUpdate(nextPorps) {
    if (this.props.children !== nextPorps.children) {
      const totalWidth = this.container.offsetWidth;
      const image = this.container.querySelector('.image');
      const elWidth = image ? image.offsetWidth : 1;
      this.setState({
        total: totalWidth / elWidth,
      });
    }
  }

  handleGoLeft = () => {
    this.setState({
      currentIndex: this.state.currentIndex - 1,
    });
  }

  handleGoRight = () => {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
  }

  render() {
    const { children } = this.props;
    const { total, currentIndex } = this.state;

    return (
      <div ref={(r) => { this.container = r; }} className="img-contrainer">
        <style jsx>{`
          .img-contrainer {
            position: relative;
          }
          i {
            vertical-align: middle !important;
          }
          button {
            padding: 5px !important;
            position: absolute !important;
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            cursor: pointer;
            border-radius: 50%;
            text-align: center;
            line-height: 1;
            position: relative;
            border: 2px solid transparent;
            background: #ffffff;
            box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.14);
          }
          .button-right {
            right: 0;
          }
        `}</style>
        {
          currentIndex > 0 ? (
            <button onClick={this.handleGoLeft} className="button-left">
              <i className="material-icons">keyboard_arrow_left</i>
            </button>
          ) : null
        }
        {
          currentIndex + total < children.length ? (
            <button onClick={this.handleGoRight} className="button-right">
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          ) : null
        }
        <div>{ children.slice(currentIndex, currentIndex + total) }</div>
      </div>
    );
  }
}
