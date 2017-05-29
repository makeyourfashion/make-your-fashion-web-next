import {
  RECT_WIDTH,
  RECT_HEIGHT,
} from './consts';

const BASE_WIDTH = 1000;
const BASE_HEIGHT = 1750;

function toCanvasPx(x, y) {
  return {
    x: (x / BASE_WIDTH) * RECT_WIDTH,
    y: (y / BASE_HEIGHT) * RECT_HEIGHT,
  };
}

function fromCanvasPx(x, y) {
  return {
    x: (x / RECT_WIDTH) * BASE_WIDTH,
    y: (y / RECT_HEIGHT) * BASE_HEIGHT,
  };
}

function toCanvasHeight(height) {
  return (height / BASE_HEIGHT) * RECT_HEIGHT;
}

function toCanvasWidth(width) {
  return (width / BASE_WIDTH) * RECT_WIDTH;
}

function fromCanvasHeight(height) {
  return (height / RECT_HEIGHT) * BASE_HEIGHT;
}

function fromCanvasWidth(width) {
  return (width / RECT_WIDTH) * BASE_WIDTH;
}

export {
  toCanvasPx,
  fromCanvasPx,
  toCanvasHeight,
  toCanvasWidth,
  fromCanvasHeight,
  fromCanvasWidth,
};
