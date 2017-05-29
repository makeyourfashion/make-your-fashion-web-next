import React from 'react';
import { Image, Text as KonvaText, Group, Rect } from 'react-konva';
import { inject, observer } from 'mobx-react';
import { toCanvasPx, fromCanvasPx, toCanvasWidth } from './canvasUtil';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  RECT_WIDTH,
  RECT_HEIGHT,
} from './consts';

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
export default class Text extends React.Component {
  static defaultProps = {
    editible: true,
    text: {},
  }

  state = {
    removeImg: null,
  };
  componentDidMount() {
    this.rect.setWidth(this.text.getWidth());
    this.rect.setHeight(this.text.getHeight());
    if (!this.props.editible) {
      this.rect.hide();
      this.deleteButton.hide();
      // this.props.toggleEditTextPanel(false);
    }
    const removeImg = new window.Image();
    removeImg.src = '/static/image/delete.svg';
    removeImg.onload = () => {
      this.setState({
        removeImg,
      });
    };
    this.deleteButton.setY((this.text.getHeight() - 30) / 2);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.editible) {
      this.rect.hide();
      this.deleteButton.hide();
      // this.props.toggleEditTextPanel(false);
    } else {
      this.deleteButton.show();
      this.rect.show();
    }
  }

  componentDidUpdate() {
    this.rect.setWidth(this.text.getWidth());
    this.rect.setHeight(this.text.getHeight());
  }

  handleDragBound = (pos) => {
    const minx = (CANVAS_WIDTH - RECT_WIDTH) / 2;
    const miny = (CANVAS_HEIGHT - RECT_HEIGHT) / 2;
    const maxx = (minx + RECT_WIDTH) - this.text.getWidth();
    const maxy = (miny + RECT_HEIGHT) - this.text.getHeight();
    return getDragBound(pos, minx, miny, maxx, maxy);
  }

  handleRemoveText = () => {
    this.props.designStore.removeText(this.props.text.id);
  }

  handleDragEnd = () => {
    const { x, y } = fromCanvasPx(this.group.attrs.x, this.group.attrs.y);
    this.props.designStore.updateText({ x, y, id: this.props.text.id });
    this.props.onDragEnd();
  }

  handleClick = () => {
    if (this.props.editible) {
      this.props.designStore.setActiveTextId(this.props.text.id);
      // this.props.toggleEditTextPanel(true);
    }
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
    const { text, x, y, fontSize, fontFamily, color, width, align, bold, italic } = this.props.text;
    const canvasWidth = toCanvasWidth(width);
    const canvasXY = toCanvasPx(x, y);
    return (
      <Group
        ref={(r) => { this.group = r; }}
        x={canvasXY.x}
        y={canvasXY.y}
        draggable={this.props.editible}
        onDragMove={this.handleDrag}
        onDragEnd={this.handleDragEnd}
        dragBoundFunc={this.handleDragBound}
      >
        <Group
          x={-30}
          ref={(r) => { this.deleteButton = r; }}
          onClick={this.handleRemoveText}
          onTouchStart={this.handleRemoveText}
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
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
            image={this.state.removeImg}
          />
        </Group>
        <Rect
          strokeWidth={1}
          ref={(r) => { this.rect = r; }}
          stroke="white"
          dash={[10, 5]}
        />
        <KonvaText
          onMouseDown={this.handleClick}
          onTouchStart={this.handleClick}
          ref={(r) => { this.text = r; }}
          fill={color}
          fontSize={fontSize}
          fontFamily={fontFamily}
          text={text}
          align={align}
          width={canvasWidth}
          fontStyle={`${bold ? 'bold' : ''}${italic ? ' italic' : ''}`}
        />
      </Group>
    );
  }
}
