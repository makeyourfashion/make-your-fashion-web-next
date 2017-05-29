import React from 'react';
import { Image, Rect, Group, Circle } from 'react-konva';
import { inject, observer } from 'mobx-react';
import {
  toCanvasPx,
  fromCanvasPx,
  toCanvasHeight,
  toCanvasWidth,
  fromCanvasHeight,
  fromCanvasWidth,
} from './canvasUtil';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  RECT_WIDTH,
  RECT_HEIGHT,
} from './consts';

const ZOOM_BTN_SIZE = 5;
const MIN_DESIGN_SIZE = 10;

function getDragBound(pos, minx, miny, maxx, maxy) {
  let x;
  let y;

  if (pos.x < minx) {
    x = minx;
  } else if (pos.x > maxx) {
    x = maxx;
  } else {
    x = pos.x;
  }

  if (pos.y < miny) {
    y = miny;
  } else if (pos.y > maxy) {
    y = maxy;
  } else {
    y = pos.y;
  }

  return {
    x,
    y,
  };
}

@inject('designStore', 'pictureStore') @observer
export default class DesignImage extends React.Component {
  static defaultProps = {
    editible: true,
  }

  state = {
    image: null,
    removeImg: null,
    rotateImg: null,
  };

  componentDidMount() {
    const image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.src = this.props.design.imgUrl;
    image.onload = () => {
      this.setState({
        image,
      });
    };

    const removeImg = new window.Image();
    removeImg.src = '/static/image/delete.svg';
    removeImg.onload = () => {
      this.setState({
        removeImg,
      });
    };
    const rotateImg = new window.Image();
    rotateImg.src = '/static/image/rotate.svg';
    rotateImg.onload = () => {
      this.setState({
        rotateImg,
      });
    };

    if (this.props.editible) {
      this.topleft.show();
      this.topright.show();
      this.bottomleft.show();
      this.bottomright.show();
      this.rect.show();
      this.removeBtn.show();
      // this.rotateBtn.show();
    }

    if (!this.props.editible) {
      this.topleft.hide();
      this.topright.hide();
      this.bottomleft.hide();
      this.bottomright.hide();
      this.rect.hide();
      this.removeBtn.hide();
      // this.rotateBtn.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    const image = new window.Image();
    image.crossOrigin = 'Anonymous';
    image.src = nextProps.design.imgUrl;
    image.onload = () => {
      this.setState({
        image,
      });
    };

    if (nextProps.editible) {
      this.rect.show();
      this.topleft.show();
      this.topright.show();
      this.bottomleft.show();
      this.bottomright.show();
      this.removeBtn.show();
      // this.rotateBtn.show();
      this.props.onChangeLayer();
    }

    if (!nextProps.editible) {
      this.rect.hide();
      this.topleft.hide();
      this.topright.hide();
      this.bottomleft.hide();
      this.bottomright.hide();
      this.removeBtn.hide();
      // this.rotateBtn.hide();
      this.props.onChangeLayer();
    }
  }

  handleDragEnd = () => {
    const { x, y } = fromCanvasPx(this.group.attrs.x, this.group.attrs.y);
    this.props.designStore.updateImage({ id: this.props.design.id, x, y });
    this.props.onDragEnd();
  }

  handleDragBound = (pos) => {
    const minx = (CANVAS_WIDTH - RECT_WIDTH) / 2;
    const miny = (CANVAS_HEIGHT - RECT_HEIGHT) / 2;
    const maxx = (minx + RECT_WIDTH) - this.group.attrs.width;
    const maxy = (miny + RECT_HEIGHT) - this.group.attrs.height;
    return getDragBound(pos, minx, miny, maxx, maxy);
  }

  handleDragTopLeftBound = (pos) => {
    const { offsetX, offsetY } = this.props;
    const minx = offsetX - ZOOM_BTN_SIZE;
    const miny = offsetY - ZOOM_BTN_SIZE;
    const maxx = (offsetX + (this.group.attrs.x + this.group.attrs.width))
      - ZOOM_BTN_SIZE - MIN_DESIGN_SIZE;
    const maxy = (offsetY + (this.group.attrs.y + this.group.attrs.height))
      - ZOOM_BTN_SIZE - MIN_DESIGN_SIZE;
    return getDragBound(pos, minx, miny, maxx, maxy);
  }

  handleDragBottomLeftBound = (pos) => {
    const { offsetX, offsetY } = this.props;
    const minx = offsetX - ZOOM_BTN_SIZE;
    const miny = offsetY + this.group.attrs.y + ZOOM_BTN_SIZE + MIN_DESIGN_SIZE;
    const maxx = (offsetX + (this.group.attrs.x + this.group.attrs.width))
      - ZOOM_BTN_SIZE - MIN_DESIGN_SIZE;
    const maxy = offsetY + RECT_HEIGHT + ZOOM_BTN_SIZE;
    return getDragBound(pos, minx, miny, maxx, maxy);
  }

  handleDragTopRightBound = (pos) => {
    const { offsetX, offsetY } = this.props;
    const minx = offsetX + this.group.attrs.x + ZOOM_BTN_SIZE + MIN_DESIGN_SIZE;
    const miny = offsetY - ZOOM_BTN_SIZE;
    const maxx = offsetX + RECT_WIDTH + ZOOM_BTN_SIZE;
    const maxy = (offsetY + (this.group.attrs.y + this.group.attrs.height))
      - ZOOM_BTN_SIZE - MIN_DESIGN_SIZE;
    return getDragBound(pos, minx, miny, maxx, maxy);
  }

  handleDragBottomRightBound = (pos) => {
    const { offsetX, offsetY } = this.props;
    const minx = offsetX + this.group.attrs.x + ZOOM_BTN_SIZE + MIN_DESIGN_SIZE;
    const miny = offsetY + this.group.attrs.y + ZOOM_BTN_SIZE + MIN_DESIGN_SIZE;
    const maxx = offsetX + RECT_WIDTH;
    const maxy = offsetY + RECT_HEIGHT;
    return getDragBound(pos, minx, miny, maxx, maxy);
  }


  handleDragGroup = () => {
    this.callParentDragCB();
    this.reRenderRect();
  }

  reRenderRect = () => {
    this.topleft.setX(this.group.attrs.x - ZOOM_BTN_SIZE);
    this.topleft.setY(this.group.attrs.y - ZOOM_BTN_SIZE);
    this.bottomleft.setX(this.group.attrs.x - ZOOM_BTN_SIZE);
    this.bottomleft.setY(this.group.attrs.y + this.group.attrs.height + ZOOM_BTN_SIZE);
    this.topright.setX(this.group.attrs.x + this.group.attrs.width + ZOOM_BTN_SIZE);
    this.topright.setY(this.group.attrs.y - ZOOM_BTN_SIZE);
    this.bottomright.setX(this.group.attrs.x + this.group.attrs.width + ZOOM_BTN_SIZE);
    this.bottomright.setY(this.group.attrs.y + this.group.attrs.height + ZOOM_BTN_SIZE);
    this.removeBtn.setX(this.group.attrs.x - 27.5);
    this.removeBtn.setY((this.group.attrs.y + (this.group.attrs.height / 2)) - 10);
    // this.rotateBtn.setX(this.group.attrs.x + this.group.attrs.width + 12.5);
    // this.rotateBtn.setY((this.group.attrs.y + (this.group.attrs.height / 2)) - 10);
  }

  reRenderGroup = (x, y, width, height) => {
    this.group.setX(x);
    this.group.setY(y);
    this.group.setWidth(width);
    this.group.setHeight(height);
    this.rect.setWidth(width);
    this.rect.setHeight(height);
    this.image.setWidth(width);
    this.image.setHeight(height);
    this.reRenderRect();
  }

  handleResizeEnd = () => {
    const { x, y } = fromCanvasPx(this.group.attrs.x, this.group.attrs.y);
    const width = fromCanvasWidth(this.group.attrs.width);
    const height = fromCanvasHeight(this.group.attrs.height);
    this.props.designStore.updateImage({ id: this.props.design.id, x, y, width, height });
    this.props.onDragEnd();
  }

  handleDragTopleft = () => {
    const groupx = this.topleft.attrs.x + ZOOM_BTN_SIZE;
    const groupy = this.topleft.attrs.y + ZOOM_BTN_SIZE;
    const width = (this.group.attrs.x - groupx) + this.group.attrs.width;
    const height = (this.group.attrs.y - groupy) + this.group.attrs.height;
    this.reRenderGroup(groupx, groupy, width, height);
    this.callParentDragCB();
  }

  callParentDragCB = () => {
    const { x, y, width, height } = this.group.attrs;
    this.props.onDrag({
      x, y, width, height,
    });
  }

  handleDragBottomleft = () => {
    const groupx = this.bottomleft.attrs.x + ZOOM_BTN_SIZE;
    const width = (this.group.attrs.x - groupx) + this.group.attrs.width;
    const height = this.bottomleft.attrs.y - this.group.attrs.y - ZOOM_BTN_SIZE;
    this.reRenderGroup(groupx, this.group.attrs.y, width, height);
    this.callParentDragCB();
  }

  handleDragTopRight = () => {
    const groupy = this.topright.attrs.y + ZOOM_BTN_SIZE;
    const width = this.topright.attrs.x - this.group.attrs.x - ZOOM_BTN_SIZE;
    const height = (this.group.attrs.y - this.topright.attrs.y - ZOOM_BTN_SIZE)
      + this.group.attrs.height;
    this.reRenderGroup(this.group.attrs.x, groupy, width, height);
    this.callParentDragCB();
  }

  handleDragBottomRight = () => {
    const width = this.bottomright.attrs.x - this.group.attrs.x;
    const height = this.bottomright.attrs.y - this.group.attrs.y;
    this.reRenderGroup(this.group.attrs.x, this.group.attrs.y, width, height);
    this.callParentDragCB();
  }

  handleRemoveDesign = () => {
    this.props.designStore.removePicture(this.props.design.id);
  }

  handleMouseOver = (e) => {
    document.body.style.cursor = 'pointer';
    e.target.setStrokeWidth(2);
    this.props.onChangeLayer();
  }

  handleMouseOut = (e) => {
    document.body.style.cursor = 'default';
    e.target.setStrokeWidth(1);
    this.props.onChangeLayer();
  }

  handleRotate = () => {
    const { x, y } = this.rotateBtn.attrs;
    const degree = ((Math.atan((y - this.group.attrs.y) / (x - this.group.attrs.x))) * 180)
      / Math.PI;
    this.group.rotate(degree);
  }

  render() {
    const { x, y, width, height } = this.props.design;
    const canvasXY = toCanvasPx(x, y);
    const adjWidth = toCanvasWidth(width);
    const adjHeight = toCanvasHeight(height);
    const radius = Math.sqrt(2) * ZOOM_BTN_SIZE;
    return (
      <Group>
        <Circle
          strokeWidth={1}
          draggable={this.props.editible}
          onDragMove={this.handleDragTopleft}
          onDragEnd={this.handleResizeEnd}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          dragBoundFunc={this.handleDragTopLeftBound}
          ref={(r) => { this.topleft = r; }}
          fill="grey"
          stroke="white"
          x={canvasXY.x - ZOOM_BTN_SIZE}
          y={canvasXY.y - ZOOM_BTN_SIZE} radius={radius}
        />
        <Circle
          strokeWidth={1}
          draggable={this.props.editible}
          onDragMove={this.handleDragBottomleft}
          onDragEnd={this.handleResizeEnd}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          dragBoundFunc={this.handleDragBottomLeftBound}
          ref={(r) => { this.bottomleft = r; }}
          fill="grey"
          stroke="white"
          x={canvasXY.x - ZOOM_BTN_SIZE}
          y={canvasXY.y + adjHeight + ZOOM_BTN_SIZE} radius={radius}
        />
        <Circle
          strokeWidth={1}
          draggable={this.props.editible}
          onDragMove={this.handleDragTopRight}
          onDragEnd={this.handleResizeEnd}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          dragBoundFunc={this.handleDragTopRightBound}
          ref={(r) => { this.topright = r; }}
          fill="grey"
          stroke="white"
          x={canvasXY.x + adjWidth + ZOOM_BTN_SIZE}
          y={canvasXY.y - ZOOM_BTN_SIZE} radius={radius}
        />
        <Circle
          strokeWidth={1}
          draggable={this.props.editible}
          onDragMove={this.handleDragBottomRight}
          onDragEnd={this.handleResizeEnd}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          dragBoundFunc={this.handleDragBottomRightBound}
          ref={(r) => { this.bottomright = r; }}
          fill="grey"
          stroke="white"
          x={canvasXY.x + adjWidth + ZOOM_BTN_SIZE}
          y={canvasXY.y + adjHeight + ZOOM_BTN_SIZE} radius={radius}
        />
        <Group
          x={canvasXY.x - 27.5} y={(canvasXY.y + (adjHeight / 2)) - 10}
          ref={(g) => { this.removeBtn = g; }}
          onClick={this.handleRemoveDesign}
          onTouchStart={this.handleRemoveDesign}
        >
          <Rect
            fill="white"
            x={2.5}
            height={20}
            width={15}
          />
          <Image
            height={20}
            width={20}
            image={this.state.removeImg}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
          />
        </Group>
        <Group
          ref={(g) => { this.group = g; }}
          x={canvasXY.x} y={canvasXY.y}
          width={adjWidth} height={adjHeight}
          draggable={this.props.editible}
          onDragMove={this.handleDragGroup}
          onDragEnd={this.handleDragEnd}
          dragBoundFunc={this.handleDragBound}
        >
          <Rect
            strokeWidth={1}
            ref={(r) => { this.rect = r; }}
            stroke="white" width={adjWidth} height={adjHeight} dash={[10, 5]}
          />
          <Image
            ref={(r) => { this.image = r; }}
            width={adjWidth} height={adjHeight}
            image={this.state.image}
          />
        </Group>
      </Group>
    );
  }
}
