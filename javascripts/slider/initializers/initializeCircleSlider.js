import { create, calcColor } from '../utils';
import { circleDraggerCallback } from '../listeners/circleDraggerCallback';



export const initializeCircleSlider = (canvasWidth, spectrumWidth, dragDiam) => {
  const spectrumContainer = create('DIV', container,{
    id: 'spectrumContainer',
    width: canvasWidth
  },{
    background: 'black',
    'border-radius': '5px',
    height: canvasWidth + 'px',
    width: canvasWidth + 'px',
    position: 'relative'
  })

  const circleSlider = create('CANVAS', spectrumContainer, {
    id: 'circleSlider',
    height: canvasWidth,
    width: canvasWidth,
    thickness: spectrumWidth
  });

  const circleDragger = create('DIV', spectrumContainer, {
    id: 'circleDragger',
    diameter: dragDiam,
    x: 0,
    y: canvasWidth/2
  },{
    height: dragDiam + 'px',
    width: dragDiam + 'px',
    'border-radius': '50%',
    position: 'absolute',
    top: (spectrumWidth - dragDiam)/2 + 'px',
    left: (canvasWidth - dragDiam)/2 + 'px'
  })

  const circlePip = create('DIV', circleDragger, {
    id: 'circlePip'
  },{
    height: '10px',
    width: '10px',
    'border-radius': '50%',
    background: 'rgb(255,0,0)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    transition: 'width .3s, height .3s'
  })
  circleDragger.addEventListener('mousedown', circleDraggerCallback);


  const ctx2 = circleSlider.getContext('2d');

  const buffer = ctx2.createImageData(canvasWidth, canvasWidth);
  const outer = calcXsects(circleSlider.width/2);
  const inner = calcXsects(circleSlider.width/2 - spectrumWidth);
  populateBuffer(buffer, {outer, inner});
}



const fillPixel = (buffer, i, color) => {
  buffer.data[i*4 + 0] = color[0];
  buffer.data[i*4 + 1] = color[1];
  buffer.data[i*4 + 2] = color[2];
};


const populateBuffer = (buffer, curve) => {
  const innerRadius = circleSlider.width/2 - circleSlider.thickness;

  for (let i = 0; i < circleSlider.width * circleSlider.width; i++){

    let left = i % circleSlider.width;
    const x = left - circleSlider.width/2;
    const xAvg = x + .5;

    let bottom = circleSlider.width - Math.floor(i / circleSlider.width);
    const y = bottom - circleSlider.width/2;
    const yAvg = y - .5;

    if (x === 0 && y === 0) continue;

    let progress=0;
    if (x < 0){
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3;
    } else {
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3 + 3;
    }

    const color = calcColor(progress);

    fillPixel(buffer,i,color);
    const rSquare = xAvg*xAvg + yAvg*yAvg;
    if ( rSquare <= circleSlider.width*circleSlider.width/4 && rSquare >= innerRadius* innerRadius){
      buffer.data[i*4 + 3] = 255;
    }

    antiAlias(x, y, curve.outer, buffer, i, true);
    antiAlias(x, y, curve.inner, buffer, i, false);

  }

  const ctx = circleSlider.getContext('2d');
  ctx.putImageData(buffer,0,0);
}





//TODO find boundary. if x < 0 find error. if x > 0 find error next time.
//TODO find negative boundary. figure out where to place.

const calcXsects = (radius) => {
  const xsects = {};
  for (let i=0; i<circleSlider.width+1; i++){
    let coord = i - circleSlider.width/2;
    let collision = Math.sqrt(radius*radius - coord * coord);
    xsects[coord] = collision;
  }
  return xsects;
}

const orient = (x, y) => {
  let orientation = {};
  orientation.x = x > 0 ? 0 : 1;
  orientation.y = y > 0 ? 0 : 1;
  return orientation;
}

const antiAlias = (x, y, curve, buffer, i, convex) => {

  const left = x;
  const right = x + 1;
  const bottom = y - 1;
  const top = y;
  const collision = {};

  if (
    left <= curve[top] && curve[top] <= right ||
    left <= -curve[top] && -curve[top] <= right
     ){
    //top collision
    collision.top = x > 0 ? curve[top]-left : -curve[top]-left;
  }

  if (
    left <= curve[bottom] && curve[bottom] <= right ||
    left <= -curve[bottom] && -curve[bottom] <= right
  ){
    //bottom collision
    collision.bottom = x > 0 ? curve[bottom]-left : -curve[bottom]-left;
  }

  if (
    bottom <= curve[left] && curve[left] <= top ||
    bottom <= -curve[left] && -curve[left] <= top
  ){
    //left collision
    collision.left = y > 0 ? curve[left]-bottom : -curve[left]-bottom;
  }

  if (
    bottom <= curve[right] && curve[right] <= top ||
     bottom <= -curve[right] && -curve[right] <= top
  ){
    //right collision
    collision.right = y > 0 ? curve[right]-bottom : -curve[right]-bottom;
  }

 const orientation = orient(x,y);
 setOpacity(collision, orientation, buffer, i, convex, x, y);

}


const n = (number) => typeof(number) === 'number' ? true : false;

const setOpacity = ({left,right,top,bottom}, orientation, buffer, i, convex , x ,y) => {
  let opacity;

  if (n(left) && n(right)){
    opacity =
      orientation.y === 0 ?
        (left+right)/2 :
        1 - (left+right)/2

  } else if (n(top) && n(bottom)) {
    opacity =
       orientation.x === 0 ?
         (top+bottom)/2 :
         1 - (top+bottom)/2

  } else if (n(bottom) && n(left)) {
    opacity =
       orientation.x === 0 && orientation.y === 0 ?
          bottom * left / 2:
          1 - bottom * left / 2
          //TODO top discont @ x = 0

  } else if (n(bottom) && n(right)) {
    opacity =
       orientation.x === 1 && orientation.y === 0 ?
          (1-bottom) * right / 2 :
          1 - (1-bottom) * right /2

  } else if (n(top) && n(left)) {
    opacity =
      orientation.x === 0 && orientation.y === 1 ?
        top * (1-left) / 2 :
        1 - top * (1-left) / 2
        //TODO bottom discont @ x = 0

  } else if (n(top) && n(right)) {
    opacity =
      orientation.x === 1 && orientation.y === 1 ?
        (1-top)*(1-right)/2 :
        1 - (1-top)*(1-right)/2

  }

  if ([left,right,top,bottom].some(el=>n(el))){
    buffer.data[i*4 + 3] = convex ?
      opacity * 255 :
      (1-opacity) * 255
  }

}
