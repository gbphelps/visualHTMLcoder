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

const moveElement = element => e => {
  element.style.top = v(element.style.top) + e.clientY - y + 'px';
  element.style.left = v(element.style.left) + e.clientX - x + 'px';
  x = e.clientX;
  y = e.clientY;
};

const bottomCb = element => e => {
  const height = v(element.style.height) + e.clientY - y;
  element.style.height =  height + 'px';
  y = e.clientY;
  wholeDoc.style.cursor = 'ns-resize';
};

const topCb = element => e => {
  const height = v(element.style.height) - e.clientY + y;
  element.style.height = height + 'px';
  if (height > 0) element.style.top = v(element.style.top) + e.clientY - y + 'px';
  y = e.clientY;
  wholeDoc.style.cursor = 'ns-resize';
};

const rightCb = element => e => {
  const width = v(element.style.width) + e.clientX - x;
  element.style.width = width + 'px';
  x = e.clientX;
  wholeDoc.style.cursor = 'ew-resize';
};

const leftCb = element => e => {
  const width = v(element.style.width) - e.clientX + x;
  element.style.width = width + 'px';
  if (width > 0) element.style.left = v(element.style.left) + e.clientX - x + 'px';
  x = e.clientX;
  wholeDoc.style.cursor = 'ew-resize';
};

const bottomRightCb = element => e => {
  bottomCb(element)(e);
  rightCb(element)(e);
  wholeDoc.style.cursor = 'nwse-resize';
};

const topLeftCb = element => e => {
  topCb(element)(e);
  leftCb(element)(e);
  wholeDoc.style.cursor = 'nwse-resize';
};

const topRightCb = element => e => {
  topCb(element)(e);
  rightCb(element)(e);
  wholeDoc.style.cursor = 'nesw-resize';
};

const bottomLeftCb = element => e => {
  bottomCb(element)(e);
  leftCb(element)(e);
  wholeDoc.style.cursor = 'nesw-resize';
};

const boundaries = [
  'boundary-bottom',
  'boundary-top',
  'boundary-right',
  'boundary-left',
  'boundary-bottom-right',
  'boundary-top-left',
  'boundary-top-right',
  'boundary-bottom-left'
];

const callbacks = [
  bottomCb,
  topCb,
  rightCb,
  leftCb,
  bottomRightCb,
  topLeftCb,
  topRightCb,
  bottomLeftCb
];



document.addEventListener('DOMContentLoaded',()=>{
  document.addEventListener('mouseup',mouseup);

  const draggable = document.createElement('DIV');
  draggable.classList.add('draggable');

  draggable.style.top = '0px';
  draggable.style.left= '0px';
  draggable.style.height = '50px';
  draggable.style.width = '50px';

  draggable.addEventListener('mousedown',drag(moveElement(draggable))); //or 'mousedown'?

  boundaries.forEach((boundary,i) => {
    const box = document.createElement('DIV');
    box.classList.add(boundary);
    box.addEventListener('mousedown',drag(callbacks[i](draggable)));
    draggable.append(box);
  })

  document.body.append(draggable);
  // draggable.getElementsByClassName('boundary-bottom')[0].addEventListener('mousedown',drag(bottomCb));
  // draggable.getElementsByClassName('boundary-top')[0].addEventListener('mousedown',drag(topCb));
  // draggable.getElementsByClassName('boundary-right')[0].addEventListener('mousedown',drag(rightCb));
  // draggable.getElementsByClassName('boundary-left')[0].addEventListener('mousedown',drag(leftCb));
  // draggable.getElementsByClassName('boundary-bottom-right')[0].addEventListener('mousedown',drag(bottomRightCb));
  // draggable.getElementsByClassName('boundary-top-left')[0].addEventListener('mousedown',drag(topLeftCb));
  // draggable.getElementsByClassName('boundary-top-right')[0].addEventListener('mousedown',drag(topRightCb));
  // draggable.getElementsByClassName('boundary-bottom-left')[0].addEventListener('mousedown',drag(bottomLeftCb));
});
