import React from 'react';
import { Image, Text as KonvaText, Group, Rect } from 'react-konva';
import { inject, observer } from 'mobx-react';
import { toCanvasPx, fromCanvasPx, toCanvasWidth, getAdjFontSize } from './canvasUtil';

@inject('designStore', 'pictureStore') @observer
export default class Text extends React.Component {
  static defaultProps = {
    editible: true,
    text: {},
  }

  state = {
    removeImg: null,
    offsetY: 0,
  };
  componentDidMount() {
    const { x, y } = this.props.text;
    const canvasXY = toCanvasPx(x, y);
    const width = this.text.getWidth();
    const height = this.text.getHeight();
    this.group.setY(canvasXY.y + (height / 2));
    this.group.setOffsetY(height / 2);
    this.rect.setWidth(width);
    this.rect.setHeight(height);
    if (!this.props.editible) {
      this.rect.hide();
      this.deleteButton.hide();
      this.rotateBtn.hide();
    }
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
    this.deleteButton.setY((this.text.getHeight() - 30) / 2);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.editible) {
      this.rect.hide();
      this.deleteButton.hide();
      this.rotateBtn.hide();
    } else {
      this.deleteButton.show();
      this.rect.show();
      this.rotateBtn.show();
    }
  }

  componentDidUpdate() {
    const { x, y } = this.props.text;
    const canvasXY = toCanvasPx(x, y);
    const width = this.text.getWidth();
    const height = this.text.getHeight();
    this.group.setY(canvasXY.y + (height / 2));
    this.group.setOffsetY(height / 2);
    this.rect.setWidth(width);
    this.rect.setHeight(height);
  }

  handleRemoveText = () => {
    this.props.designStore.removeText(this.props.text.id);
  }

  handleDragEnd = () => {
    const { x, y } = fromCanvasPx(this.group.attrs.x - this.group.attrs.offsetX
      , this.group.attrs.y - this.group.attrs.offsetY);
    this.props.designStore.updateText({ x, y, id: this.props.text.id });
    this.props.onDragEnd();
  }

  handleClick = () => {
    this.props.designStore.setActiveTextId(this.props.text.id);
  }

  handleRotate = () => {
    const diffX = this.deleteButton.getX() - this.rotateBtn.getX();
    const diffY = this.deleteButton.getY() - this.rotateBtn.getY();
    const degree = ((Math.atan(diffY / diffX)) * 180) / Math.PI;
    this.group.rotate(degree);
    this.rotateBtn.setX(-10);
    this.rotateBtn.setY(-10);
  }

  handleRotateEnd = () => {
    this.props.designStore.updateText({
      id: this.props.text.id,
      rotation: this.group.attrs.rotation,
    });
  }

  handleMouseOver = () => {
    document.body.style.cursor = 'pointer';
  }

  handleMouseOut = () => {
    document.body.style.cursor = 'default';
  }

  handleDrag = () => {
    const { x, y } = this.group.attrs;
    const width = this.text.getWidth();
    const height = this.text.getHeight();
    this.props.onDrag({
      x, y, width, height,
    });
  }

  render() {
    const { lineColor } = this.props;
    const { text, x, y, font_size, font_family, color, width, align, bold, italic } = this.props.text;
    const adjFontSize = getAdjFontSize(font_size);
    const canvasWidth = toCanvasWidth(width);
    const canvasXY = toCanvasPx(x, y);
    return (
      <Group
        ref={(r) => { this.group = r; }}
        x={canvasXY.x + (canvasWidth / 2)}
        offsetX={(canvasWidth / 2)}
        draggable={this.props.editible}
        onDragMove={this.handleDrag}
        onDragEnd={this.handleDragEnd}
        rotation={this.props.text.rotation}
      >
        <Rect
          strokeWidth={1}
          ref={(r) => { this.rect = r; }}
          stroke={lineColor}
          dash={[10, 5]}
        />
        <Group
          x={canvasWidth - 10}
          y={-10}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          ref={(r) => { this.deleteButton = r; }}
          onClick={this.handleRemoveText}
          onTouchStart={this.handleRemoveText}
        >
          <Rect
            strokeWidth={1}
            fill="white"
            stroke={lineColor}
            height={20}
            width={20}
          />
          <Image
            height={20}
            width={20}
            image={this.state.removeImg}
          />
        </Group>
        <Group
          x={-10}
          y={-10}
          draggable={this.props.editible}
          onDragMove={this.handleRotate}
          onDragEnd={this.handleRotateEnd}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          ref={(r) => { this.rotateBtn = r; }}
        >
          <Rect
            strokeWidth={1}
            fill="white"
            stroke={lineColor}
            height={20}
            width={20}
          />
          <Image
            height={20}
            width={20}
            image={this.state.rotateImg}
          />
        </Group>
        <KonvaText
          onMouseDown={this.handleClick}
          onTouchStart={this.handleClick}
          ref={(r) => { this.text = r; }}
          fill={color}
          fontSize={adjFontSize}
          fontFamily={font_family}
          text={text}
          align={align}
          width={canvasWidth}
          fontStyle={`${bold ? 'bold' : ''}${italic ? ' italic' : ''}`}
        />
      </Group>
    );
  }
}
