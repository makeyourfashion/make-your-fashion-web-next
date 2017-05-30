let canvasWidth;
let canvasHeight;
if (typeof window === 'undefined' || window.matchMedia('(min-width: 700px)').matches) {
  canvasWidth = 500;
  canvasHeight = 500;
} else {
  canvasWidth = window.screen.width - 16;
  canvasHeight = window.screen.width - 16;
}

const CANVAS_HEIGHT = canvasHeight;
const CANVAS_WIDTH = canvasWidth;
const RECT_WIDTH = (9 / 25) * CANVAS_WIDTH;
const RECT_HEIGHT = (RECT_WIDTH * 7) / 4;
const DESIGN_WIDTH = 100 * (CANVAS_WIDTH / 500);
const DESIGN_HEIGHT = 100 * (CANVAS_HEIGHT / 500);

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
