import React from 'react';
import { inject, observer } from 'mobx-react';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  RECT_WIDTH,
  RECT_HEIGHT,
} from './consts';

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

  render() {
    const lineColor = 'white';
    const images = this.props.designStore.activeImages || [];
    const texts = this.props.designStore.activeTexts || [];
    return (
      <div className="">
        <style jsx>{`
          .thumbnail {
            width: 50px;
            height: 50px;
            border: 1px solid transparent;
            margin-left: 5px;
            border-radius: 5%;
            box-shadow: 0 2px 2px 0 rgba(0,0,0,.11), inset 0 2px 2px 0 rgba(255,255,255,.3);
          }
          .thumbnails {
            margin-top: 20px;
            display: flex;
            justify-content: center;
          }
        `}</style>
        <div id="create-shirt-canvas">
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
                    <Image width={CANVAS_WIDTH} height={CANVAS_HEIGHT} image={this.state.image} />
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
            <img crossOrigin="anonymous" src={this.props.product.imgFront} alt="small" className="thumbnail" />
          </a>
          <a onClick={this.handleSelectImage} href="imgBack">
            <img crossOrigin="anonymous" src={this.props.product.imgBack} alt="small" className="thumbnail" />
          </a>
        </div>
      </div>
    );
  }
}
