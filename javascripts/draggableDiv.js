let x, y;

const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];

const drag = callback => e => {


  e.stopPropagation();
  e.preventDefault();
  x = e.clientX;
  y = e.clientY;

  document.addEventListener('mousemove', callback);

  window.mouseup = ()=>{
    document.removeEventListener('mouseup', mouseup);
    document.removeEventListener('mousemove', callback);
    wholeDoc.style.cursor = 'auto';
    if (window.snap) {
      const el = document.activeElement;
      el.style.top = Math.round(v(el.style.top)/20)*20 + 'px';
      el.style.left = Math.round(v(el.style.left)/20)*20 + 'px';
      el.style.height = Math.round(v(el.style.height)/20)*20 + 'px';
      el.style.width = Math.round(v(el.style.width)/20)*20 + 'px';
    };

  }

  document.addEventListener('mouseup', mouseup);

};

export const v = string => {
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

export const addDiv = () => {
  console.log(document.activeElement);
  const draggable = document.createElement('DIV');
  draggable.classList.add('draggable');

  draggable.style.top = '0px';
  draggable.style.left= '0px';
  draggable.style.height = '60px';
  draggable.style.width = '60px';

  draggable.addEventListener('mousedown',drag(moveElement(draggable)));




  draggable.addEventListener('focus',()=>{
    const container = document.createElement('DIV');
    container.id = 'boundary-box';

    boundaries.forEach((boundary,i) => {
      const box = document.createElement('DIV');
      box.classList.add(boundary);
      box.addEventListener('mousedown', drag(callbacks[i](draggable)));
      container.append(box);
    });

    draggable.append(container);
  });

  draggable.addEventListener('blur', ()=>{
    document.getElementById('boundary-box').remove();
  });




  document.getElementById('content').append(draggable);
  draggable.tabIndex = -1;
  draggable.addEventListener('mousedown', ()=>draggable.focus());
}
