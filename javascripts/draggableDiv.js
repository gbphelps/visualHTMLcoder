let x, y;

const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];

const drag = (callback, element) => e => {
  e.stopPropagation();
  e.preventDefault();
  x = e.clientX;
  y = e.clientY;
  const cbInvoke = callback(element);

  document.addEventListener('mousemove', cbInvoke);
  window.mouseup = ()=>{
    document.removeEventListener('mouseup', mouseup);
    document.removeEventListener('mousemove', cbInvoke);
    wholeDoc.style.cursor = 'auto';
    if (window.snap) {
      element.style.top = Math.round(v(element.style.top)/20)*20 + 'px';
      element.style.left = Math.round(v(element.style.left)/20)*20 + 'px';
      element.style.height = Math.round(v(element.style.height)/20)*20 + 'px';
      element.style.width = Math.round(v(element.style.width)/20)*20 + 'px';
    };
  }

  document.addEventListener('mouseup', mouseup);
};

export const v = string => +string.slice(0, string.length-2);

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



const appendBoundaryBox = element => {
  const container = document.createElement('DIV');
  container.id = 'boundary-box';

  boundaries.forEach((boundary,i) => {
    const box = document.createElement('DIV');
    box.classList.add(boundary);
    box.addEventListener('mousedown', drag(callbacks[i], element));
    container.append(box);
  });

  element.append(container);
}


const initializeElement = e => {
  const offset = document.getElementById('content').getBoundingClientRect();

  if (e.clientX < offset.left || e.clientY < offset.top) return;

  const spawn = document.createElement('DIV');

  spawn.classList.add('draggable');
  spawn.style.top = e.clientY - offset.top + 'px';
  spawn.style.left = e.clientX - offset.left + 'px';
  spawn.tabIndex = 0;

  spawn.addEventListener('mousedown',drag(moveElement, spawn));
  spawn.addEventListener('mousedown', ()=>spawn.focus());
  spawn.addEventListener('focus',()=> appendBoundaryBox(spawn));
  spawn.addEventListener('blur', ()=> document.getElementById('boundary-box').remove());

  document.getElementById('content').append(spawn);
  spawn.focus();
  drag(bottomRightCb, spawn)(e);
}

export const addDiv = () => {
  if (window.addDiv){
    document.removeEventListener('mousedown', initializeElement);
  }else{
    document.addEventListener('mousedown', initializeElement)
  }
  window.addDiv = !window.addDiv;
  document.getElementById('add').classList.toggle('active');

  // const draggable = document.createElement('DIV');
  // draggable.classList.add('draggable');
  //
  // draggable.style.top = '0px';
  // draggable.style.left= '0px';
  // draggable.style.height = '60px';
  // draggable.style.width = '60px';
  // draggable.tabIndex = 0;
  //
  // draggable.addEventListener('mousedown',drag(moveElement(draggable)));
  // draggable.addEventListener('mousedown', ()=>draggable.focus());
  // draggable.addEventListener('focus',()=> appendBoundaryBox(draggable));
  // draggable.addEventListener('blur', ()=> document.getElementById('boundary-box').remove());
  //
  //
  // document.getElementById('content').append(draggable);
}
