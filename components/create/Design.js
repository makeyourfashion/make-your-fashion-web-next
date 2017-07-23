import React from 'react';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  RECT_WIDTH,
  RECT_HEIGHT,
} from './consts';
import BubbleButton from '../BubbleButton';
import ShirtIcon from './ShirtIcon';

@inject('designStore') @observer
export default class Design extends React.Component {
  state = {
    image: null,
  }

  componentDidMount() {
    if (this.props.product) {
      const activeImage = this.props.product.imgFront;
      this.props.designStore.setActiveImageId('imgFront');

      const image = new window.Image();
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = activeImage;
      image.onload = () => {
        this.setState({
          image,
        });
      };
      this.lineX.hide();
      this.lineY.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.props.editable) {
      if (nextProps.editable) {
        this.rect.show();
      } else {
        this.rect.hide();
      }
    }
  }

  selectProduct = () => {
    Router.push('/shop?category=2');
  }

  handleDrag = ({ x, y, width, height }) => {
    if (Math.round(x) === Math.round(RECT_WIDTH / 2)
      || Math.round(x + (width / 2)) === Math.round(RECT_WIDTH / 2)
      || Math.round(x + width) === Math.round(RECT_WIDTH / 2)) {
      this.lineX.show();
    } else {
      this.lineX.hide();
    }

    if (Math.round(y) === Math.round(RECT_HEIGHT / 2)
      || Math.round(y + (height / 2)) === Math.round(RECT_HEIGHT / 2)
      || Math.round(y + height) === Math.round(RECT_HEIGHT / 2)) {
      this.lineY.show();
    } else {
      this.lineY.hide();
    }
  }

  handleSelectImage = (e) => {
    e.preventDefault();
    const activeImageId = e.target.closest('a').getAttribute('href');
    this.props.designStore.setActiveImageId(activeImageId);
    const image = new window.Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = e.target.getAttribute('src');
    image.onload = () => {
      this.setState({
        image,
      });
    };
  }

  handlLayerChange = () => {
    this.refs.layer.draw();
  }

  handleDragEnd = () => {
    window.setTimeout(() => {
      this.lineX.hide();
      this.lineY.hide();
      this.refs.layer.draw();
    }, 1000);
  }

  handleMenuClick = (e) => {
    const tabId = +e.target.closest('button').getAttribute('data-tab-id');
    this.props.onSelectPicture(tabId);
  }

  render() {
    const lineColor = 'white';
    const images = this.props.designStore.activeImages || [];
    const texts = this.props.designStore.activeTexts || [];
    const showCallToAction = (!this.props.designStore.design.texts.length)
      && (!this.props.designStore.design.images.length);
    return (
      <div className="">
        <style jsx>{`
          .thumbnail {
            width: 80px;
            height: 80px;
            border: 1px solid transparent;
            margin-left: 5px;
          }
          .active {
            border: solid 1px #ccc;
          }
          .thumbnails {
            margin-top: 20px;
            display: flex;
            justify-content: center;
          }
          #create-shirt-canvas {
            position: relative;
          }
          .call-to-action {
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
          }
          .action-des {
            position: absolute;
            top: calc(40% + 50px);;
            left: 50%;
            transform: translateX(-50%);
             z-index: 9999;
          }
          .menu {
            position: absolute;
            top: 10%;
            left: 0;
            z-index: 9;
          }
          .list-item {
            margin-bottom: 10px;
            flex-direction: column;
          }
          .icon-button {
            font-size: 0.9em;
            margin-right: 0;
            background-color: rgba(255,255,255,0);
          }
          @media (min-width: 600px) {
            .menu {
              display: none;
            }
          }
        `}</style>
        <div id="create-shirt-canvas">
          {
            showCallToAction ? (
              <div className="call-to-action">
                <BubbleButton data-tab-id={2} onTouchStart={this.handleMenuClick} onClick={this.handleMenuClick}>
                  <i className="material-icons">add</i>
                </BubbleButton>
              </div>
            ) : (
              <ul className="mdc-list menu">
                <li data-action="select-product" className="mdc-list-item list-item">
                  <ShirtIcon />
                  <button data-tab-id={0} onTouchStart={this.selectProduct} onClick={this.selectProduct} className="icon-button">
                    产品
                  </button>
                </li>
                <li data-action="select-design" className="mdc-list-item list-item">
                  <i className="material-icons" aria-hidden="true">collections</i>
                  <button data-tab-id={2} onTouchStart={this.handleMenuClick} onClick={this.handleMenuClick} className="icon-button">
                    素材
                  </button>
                </li>
                <li data-action="add-text" className="mdc-list-item list-item">
                  <i className="material-icons" aria-hidden="true">text_fields</i>
                  <button data-tab-id={1} onTouchStart={this.handleMenuClick} onClick={this.handleMenuClick} className="icon-button">
                    文字
                  </button>
                </li>
              </ul>
            )
          }
          {
            showCallToAction ? (
              <div className="action-des">点击开设定制</div>
            ) : null
          }
          {
            (() => {
              if (typeof window === 'undefined') {
                return null;
              }
              const Layer = require('react-konva').Layer;
              const Image = require('react-konva').Image;
              const Stage = require('react-konva').Stage;
              const Rect = require('react-konva').Rect;
              const DesignImage = require('./DesignImage').default;
              const Text = require('./Text').default;
              const Group = require('react-konva').Group;
              const Line = require('react-konva').Line;
              return (
                <Stage
                  x={0} y={0} width={CANVAS_WIDTH} height={CANVAS_WIDTH}
                >
                  <Layer ref="layer">
                    <Image width={CANVAS_WIDTH} height={CANVAS_HEIGHT} preventDefault={false} image={this.state.image} />
                    <Group
                      x={(CANVAS_WIDTH - RECT_WIDTH) / 2}
                      y={(CANVAS_HEIGHT - RECT_HEIGHT) / 2}
                      width={RECT_WIDTH}
                      height={RECT_HEIGHT}
                    >
                      <Rect
                        strokeWidth={1}
                        x={0}
                        y={0}
                        width={RECT_WIDTH}
                        height={RECT_HEIGHT}
                        preventDefault={false}
                        ref={(r) => { this.rect = r; }}
                        stroke={lineColor}
                      />
                      {
                        images.map(image => <DesignImage
                          key={image.id}
                          onDragEnd={this.handleDragEnd}
                          onDrag={this.handleDrag}
                          offsetX={(CANVAS_WIDTH - RECT_WIDTH) / 2}
                          offsetY={(CANVAS_HEIGHT - RECT_HEIGHT) / 2}
                          editible={this.props.editable}
                          onChangeLayer={this.handlLayerChange}
                          design={image}
                        />)
                      }
                      {
                        texts.map(text => (
                          <Text
                            onDragEnd={this.handleDragEnd}
                            onDrag={this.handleDrag}
                            key={text.id}
                            editible={this.props.editable}
                            onChangeLayer={this.handlLayerChange}
                            text={text}
                          />
                        ))
                      }
                    </Group>
                    <Line
                      ref={(r) => { this.lineX = r; }}
                      points={[CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT]}
                      stroke={lineColor}
                      strokeWidth={1}
                    />
                    <Line
                      ref={(r) => { this.lineY = r; }}
                      points={[0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2]}
                      stroke={lineColor}
                      strokeWidth={1}
                    />
                  </Layer>
                </Stage>
              );
            })()
          }
        </div>
        <div className="thumbnails">
          <a onClick={this.handleSelectImage} href="imgFront">
            <img crossOrigin="anonymous" src={this.props.product.imgFront} alt="small" className={`thumbnail ${this.props.designStore.activeImageId === 'imgFront' ? 'active' : ''}`} />
          </a>
          <a onClick={this.handleSelectImage} href="imgBack">
            <img crossOrigin="anonymous" src={this.props.product.imgBack} alt="small" className={`thumbnail ${this.props.designStore.activeImageId === 'imgBack' ? 'active' : ''}`} />
          </a>
        </div>
      </div>
    );
  }
}
