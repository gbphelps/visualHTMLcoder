let x, y, draggable;
const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];


const drag = callback => e => {
  e.stopPropagation();
  e.preventDefault();
  x = e.clientX;
  y = e.clientY;
  window.dragListener = callback;
  document.addEventListener('mousemove', window.dragListener)
};

const mouseup = () => {
  document.removeEventListener('mousemove', window.dragListener);
  wholeDoc.style.cursor = 'auto';
};

const v = string => {
  return +string.slice(0, string.length-2);
};

const moveElement = e=>{
  draggable.style.top = v(draggable.style.top) + e.clientY - y + 'px';
  draggable.style.left = v(draggable.style.left) + e.clientX - x + 'px';
  x = e.clientX;
  y = e.clientY;
};

const bottomCb = e => {
  const height = v(draggable.style.height) + e.clientY - y;
  draggable.style.height =  height + 'px';
  y = e.clientY;
  wholeDoc.style.cursor = 'ns-resize';
};

const topCb = e => {
  const height = v(draggable.style.height) - e.clientY + y;
  draggable.style.height = height + 'px';
  if (height > 0) draggable.style.top = v(draggable.style.top) + e.clientY - y + 'px';
  y = e.clientY;
  wholeDoc.style.cursor = 'ns-resize';
};

const rightCb = e => {
  const width = v(draggable.style.width) + e.clientX - x;
  draggable.style.width = width + 'px';
  x = e.clientX;
  wholeDoc.style.cursor = 'ew-resize';
};

const leftCb = e => {
  const width = v(draggable.style.width) - e.clientX + x;
  draggable.style.width = width + 'px';
  if (width > 0) draggable.style.left = v(draggable.style.left) + e.clientX - x + 'px';
  x = e.clientX;
  wholeDoc.style.cursor = 'ew-resize';
};

const bottomRightCb = e => {
  bottomCb(e);
  rightCb(e);
  wholeDoc.style.cursor = 'nwse-resize';
};

const topLeftCb = e => {
  topCb(e);
  leftCb(e);
  wholeDoc.style.cursor = 'nwse-resize';
};

const topRightCb = e => {
  topCb(e);
  rightCb(e);
  wholeDoc.style.cursor = 'nesw-resize';
};

const bottomLeftCb = e => {
  bottomCb(e);
  leftCb(e);
  wholeDoc.style.cursor = 'nesw-resize';
};



document.addEventListener('DOMContentLoaded',()=>{

  draggable = document.getElementsByClassName('draggable')[0];

  draggable.style.top = '0px';
  draggable.style.left= '0px';
  draggable.style.height = '50px';
  draggable.style.width = '50px';

  draggable.addEventListener('mousedown',drag(moveElement)); //or 'mousedown'?
  document.addEventListener('mouseup',mouseup);

  draggable.getElementsByClassName('boundary-bottom')[0].addEventListener('mousedown',drag(bottomCb));
  draggable.getElementsByClassName('boundary-top')[0].addEventListener('mousedown',drag(topCb));
  draggable.getElementsByClassName('boundary-right')[0].addEventListener('mousedown',drag(rightCb));
  draggable.getElementsByClassName('boundary-left')[0].addEventListener('mousedown',drag(leftCb));
  draggable.getElementsByClassName('boundary-bottom-right')[0].addEventListener('mousedown',drag(bottomRightCb));
  draggable.getElementsByClassName('boundary-top-left')[0].addEventListener('mousedown',drag(topLeftCb));
  draggable.getElementsByClassName('boundary-top-right')[0].addEventListener('mousedown',drag(topRightCb));
  draggable.getElementsByClassName('boundary-bottom-left')[0].addEventListener('mousedown',drag(bottomLeftCb));
});
