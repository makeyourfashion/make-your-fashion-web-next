import React from 'react';
import { Image, Rect, Group } from 'react-konva';
import { inject, observer } from 'mobx-react';
import {
  toCanvasPx,
  fromCanvasPx,
  toCanvasHeight,
  toCanvasWidth,
  fromCanvasHeight,
  fromCanvasWidth,
} from './canvasUtil';

@inject('designStore', 'pictureStore') @observer
export default class DesignImage extends React.Component {
  static defaultProps = {
    editible: true,
  }

  state = {
    image: null,
    removeImg: null,
    rotateImg: null,
    rotate: 0,
  };

  componentDidMount() {
    const image = new window.Image();
    // image.crossOrigin = 'Anonymous';
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = this.props.design.design.img_url;
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

    const zoomImg = new window.Image();
    zoomImg.src = '/static/image/zoom.svg';
    zoomImg.onload = () => {
      this.setState({
        zoomImg,
      });
    };

    if (this.props.editible) {
      this.zoomBtn.show();
      this.rect.show();
      this.removeBtn.show();
      this.rotateBtn.show();
    }

    if (!this.props.editible) {
      this.zoomBtn.hide();
      this.rect.hide();
      this.removeBtn.hide();
      this.rotateBtn.hide();
    }
  }

  componentWillReceiveProps(nextProps) {
    const image = new window.Image();
    // image.crossOrigin = 'Anonymous';
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = nextProps.design.design.img_url;
    image.onload = () => {
      this.setState({
        image,
      });
    };

    if (nextProps.editible) {
      this.rect.show();
      this.zoomBtn.show();
      this.removeBtn.show();
      this.rotateBtn.show();
      this.props.onChangeLayer();
    }

    if (!nextProps.editible) {
      this.rect.hide();
      this.zoomBtn.hide();
      this.removeBtn.hide();
      this.rotateBtn.hide();
      this.props.onChangeLayer();
    }
  }

  handleDragEnd = () => {
    const { x, y } = fromCanvasPx(this.group.attrs.x - this.group.attrs.offsetX
      , this.group.attrs.y - this.group.attrs.offsetY);
    this.props.designStore.updateImage({ id: this.props.design.id, x, y });
    this.props.onDragEnd();
  }

  handleDragGroup = () => {
    this.callParentDragCB();
  }

  handleZoomEnd = () => {
    const { x, y } = fromCanvasPx(this.group.attrs.x - this.group.attrs.offsetX
      , this.group.attrs.y - this.group.attrs.offsetY);
    const width = fromCanvasWidth(this.group.attrs.width);
    const height = fromCanvasHeight(this.group.attrs.height);
    this.props.designStore.updateImage({ id: this.props.design.id, x, y, width, height });
    this.props.onDragEnd();
  }

  callParentDragCB = () => {
    const { x, y, width, height } = this.group.attrs;
    this.props.onDrag({
      x, y, width, height,
    });
  }

  handleZoom = () => {
    this.group.setDraggable(false);
    const width = this.zoomBtn.attrs.x + 10;
    const percent = width / this.rect.getWidth();
    const height = this.rect.getHeight() * percent;
    this.group.setWidth(width);
    this.group.setHeight(height);
    this.rect.setWidth(width);
    this.rect.setHeight(height);
    this.image.setWidth(width);
    this.image.setHeight(height);
    this.removeBtn.setX(width - 10);
    this.zoomBtn.setX(width - 10);
    this.zoomBtn.setY(height - 10);
    this.callParentDragCB();
    this.group.setDraggable(true);
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
    const diffX = this.removeBtn.getX() - this.rotateBtn.getX();
    const diffY = this.removeBtn.getY() - this.rotateBtn.getY();
    const degree = ((Math.atan(diffY / diffX)) * 180) / Math.PI;
      // Magic number 64, don't know where it comes from!
    this.group.rotate(degree);
    this.rotateBtn.setX(-10);
    this.rotateBtn.setY(-10);
  }

  handleRotateEnd = () => {
    this.props.designStore.updateImage({
      id: this.props.design.id,
      rotation: this.group.attrs.rotation,
    });
  }

  render() {
    const { x, y, width, height } = this.props.design;
    const canvasXY = toCanvasPx(x, y);
    const adjWidth = toCanvasWidth(width);
    const adjHeight = toCanvasHeight(height);
    return (
      <Group
        x={canvasXY.x + (adjWidth / 2)}
        y={canvasXY.y + (adjHeight / 2)}
        offsetX={(adjWidth / 2)}
        offsetY={(adjHeight / 2)}
        draggable={this.props.editible}
        onDragMove={this.handleDragGroup}
        onDragEnd={this.handleDragEnd}
        ref={(g) => { this.group = g; }}
        rotation={this.props.design.rotation}
      >
        <Rect
          strokeWidth={1}
          ref={(r) => { this.rect = r; }}
          stroke="white"
          width={adjWidth}
          height={adjHeight}
          dash={[10, 5]}
        />
        <Image
          ref={(r) => { this.image = r; }}
          width={adjWidth}
          height={adjHeight}
          image={this.state.image}
        />
        <Group
          x={adjWidth - 10}
          y={-10}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          ref={(g) => { this.removeBtn = g; }}
          onClick={this.handleRemoveDesign}
          onTouchStart={this.handleRemoveDesign}
        >
          <Rect
            strokeWidth={1}
            fill="white"
            stroke="grey"
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
            stroke="grey"
            height={20}
            width={20}
          />
          <Image
            height={20}
            width={20}
            image={this.state.rotateImg}
          />
        </Group>
        <Group
          x={adjWidth - 10}
          y={adjHeight - 10}
          draggable={this.props.editible}
          onDragMove={this.handleZoom}
          onDragEnd={this.handleZoomEnd}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          ref={(r) => { this.zoomBtn = r; }}
        >
          <Rect
            strokeWidth={1}
            fill="white"
            stroke="grey"
            height={20}
            width={20}
          />
          <Image
            height={20}
            width={20}
            image={this.state.zoomImg}
          />
        </Group>
      </Group>
    );
  }
}
