import React from 'react';
import BubbleButton from './BubbleButton';

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
          .arrow-button {
            position: absolute !important;
            top: 50%;
            transform: translateY(-50%);
          }
          :global(.button-right) {
            right: 0;
          }
        `}</style>
        {
          currentIndex > 0 ? (
            <div className="arrow-button">
              <BubbleButton onClick={this.handleGoLeft}>
                <i className="material-icons">keyboard_arrow_left</i>
              </BubbleButton>
            </div>
          ) : null
        }
        {
          currentIndex + total < children.length ? (
            <div className="arrow-button button-right">
              <BubbleButton onClick={this.handleGoRight}>
                <i className="material-icons">keyboard_arrow_right</i>
              </BubbleButton>
            </div>
          ) : null
        }
        <div>{ children.slice(currentIndex, currentIndex + total) }</div>
      </div>
    );
  }
}
