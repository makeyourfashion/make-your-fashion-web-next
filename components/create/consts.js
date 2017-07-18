let canvasWidth = 100;
let canvasHeight = 100;
if (typeof window !== 'undefined') {
  if (window.matchMedia('(min-width: 700px)').matches) {
    const maxWidth = window.innerWidth * 0.6;
    canvasWidth = maxWidth > 650 ? 650 : maxWidth;
    canvasHeight = canvasWidth;
  } else {
    canvasWidth = window.screen.width - 16;
    canvasHeight = window.screen.width - 16;
  }
}

const CANVAS_HEIGHT = canvasHeight;
const CANVAS_WIDTH = canvasWidth;
const RECT_WIDTH = (9 / 25) * CANVAS_WIDTH;
const RECT_HEIGHT = (RECT_WIDTH * 7) / 4;
const DESIGN_WIDTH = canvasHeight;
const DESIGN_HEIGHT = canvasWidth;

const fontList = [
  'Arial',
  'Courier New',
  'Lucida Console',
];

const COLORS = ['#000', '#fff', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF'];

export {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  RECT_WIDTH,
  RECT_HEIGHT,
  DESIGN_WIDTH,
  DESIGN_HEIGHT,
  fontList,
  COLORS,
};
