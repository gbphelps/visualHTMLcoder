import { create, calcColor } from '../utils';
import { circleDraggerCallback } from '../listeners/circleDraggerCallback';



export const initializeCircleSlider = (canvasWidth, spectrumWidth, dragDiam) => {
  const spectrumContainer = create('DIV', document.body,{
    id: 'spectrumContainer',
    width: canvasWidth
  },{
    background: 'black',
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
    background: 'white',
    position: 'absolute',
    top: (spectrumWidth - dragDiam)/2 + 'px',
    left: (canvasWidth - dragDiam)/2 + 'px'
  })
  circleDragger.addEventListener('mousedown', circleDraggerCallback);

  const ctx2 = circleSlider.getContext('2d');

  const buffer = ctx2.createImageData(canvasWidth, canvasWidth);
  const curve = boundaryMap(canvasWidth/2, canvasWidth/2 - spectrumWidth);
  populateBuffer(buffer, canvasWidth/2 - spectrumWidth, curve);
}



const fillPixel = (buffer, i, color) => {
  buffer.data[i*4 + 0] = color[0];
  buffer.data[i*4 + 1] = color[1];
  buffer.data[i*4 + 2] = color[2];
};


const populateBuffer = (buffer, innerRadius, curve) => {
  for (let i = 0; i < circleSlider.width * circleSlider.width; i++){

    let left = i % circleSlider.width;
    const x = left - circleSlider.width/2;

    let bottom = circleSlider.width - Math.floor(i / circleSlider.width);
    const y = bottom - circleSlider.width/2;

    if (x === 0 && y === 0) continue;

    let progress=0;
    if (x < 0){
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3;
    } else {
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3 + 3;
    }

    const color = calcColor(progress);

    fillPixel(buffer,i,color);
    const rSquare = x*x + y*y;
    if ( rSquare <= circleSlider.width*circleSlider.width/4 && rSquare >= innerRadius* innerRadius){
      buffer.data[i*4 + 3] = 255;
    }




    calcCollisions(x,y,curve, buffer, i);



  }

  const ctx = circleSlider.getContext('2d');
  ctx.putImageData(buffer,0,0);
}





//TODO find boundary. if x < 0 find error. if x > 0 find error next time.
//TODO find negative boundary. figure out where to place.


const boundaryMap = (oR, iR) => {
  const outer = [];
  const inner = [];

  for (let i=0; i<=circleSlider.width/2; i++){
    const coord = i - circleSlider.width/2;
    outer[i] = Math.sqrt(oR*oR - i*i);
    inner[i] = Math.sqrt(iR*iR - i*i);
  }
  return { outer, inner };
}








const collisionMap = (x, y, curve) => {
  const xabs = Math.abs(x);
  const yabs = Math.abs(y);
  let l,r,t,b;

  if (
    //top collision
    xabs <= curve[yabs] &&
    curve[yabs] <= xabs+1
  ){
    t = curve[yabs] - xabs;
  }

  if (
    //bottom collision
    xabs <= curve[yabs+1] &&
    curve[yabs+1] <= xabs+1
  ){
    b = curve[yabs + 1] - xabs;
  }

  if (
    //left collision
    yabs <= curve[xabs] &&
    curve[xabs] <= yabs+1
  ){
    l = curve[xabs] - yabs;
  }

  if (
    //right collision
    yabs <= curve[xabs+1] &&
    curve[xabs+1] <= yabs+1
  ){
    r = curve[xabs + 1] - yabs;
  }

  return { l, r, t, b }
}




const gt = (x,y) => x >= y;
const lt = (x,y) => x <= y;

const orient = (x, y, cb, radius) => {
  let orientation;

  if (cb(x*x + y*y, radius*radius)){
    orientation = {x:0, y:0}
  } else if (cb(x*x + (y+1)*(y+1), radius*radius)) {
    orientation = {x:0, y:1}
  } else if (cb((x+1)*(x+1) + y*y, radius*radius)) {
    orientation = {x:1, y:0}
  } else {
    orientation = {x:1, y:1}
  }

  return orientation;
}


const setOpacity = (orientation,buffer,i,l,r,t,b,lt,x,y, radius) => {
  let opacity;

  if (typeof(b) === 'number' && typeof(t) === 'number'){
    opacity = (
      orientation.x === 0 ?
        (b + t)/2 :
        1 - (b + t)/2
    )
    buffer.data[i*4 + 3] = opacity*255
  } else if (typeof(l) ==='number' && typeof(r) === 'number'){
    opacity = (
      orientation.y === 0 ?
        (l + r)/2 :
        1 - (l + r)/2
    )
    buffer.data[i*4 + 3] = opacity*255
  } else if (typeof(r) === 'number' && typeof(b) === 'number'){
      opacity = lt ? 1 : 0;
      buffer.data[i*4 + 3] = opacity*255
  } else if ( typeof(l) ==='number' && typeof(t) === 'number'){
      opacity = lt ? 0 : 1;
      buffer.data[i*4 + 3] = opacity*255
  }

  if (l === 0 || r === 0 || t === 0 || b === 0){
    //TODO: address boundary cases!!!
    // fillPixel(buffer,i,[0,0,0]);
    // buffer.data[i*4 + 3] = 255;
    // console.log({l,r,t,b},{x,y},{radius});
  }
}



const calcCollisions = (x, y, curve, buffer, i) => {

  const oR = circleSlider.width/2;
  const iR = circleSlider.width/2 - circleSlider.thickness;

  const xabs = Math.abs(x);
  const yabs = Math.abs(y);
  let l,r,t,b, orientation;


  ({l,r,t,b} = collisionMap(x, y, curve.outer));
  orientation = orient(x, y, lt, oR);

  setOpacity(orientation,buffer,i,l,r,t,b,true, x,y,oR);

  ({l,r,t,b} = collisionMap(x, y, curve.inner));
  orientation = orient(x, y, gt, iR);

  setOpacity(orientation,buffer,i,l,r,t,b, false, x,y,iR);




}













//NOTE there's something wrong with triangular cutouts (case 3-6, not 1-2)
// const setOpacity = (orientation,buffer,i,l,r,t,b,lt) => {
//   let opacity;
//
//   if (typeof(b) === 'number' && typeof(t) === 'number'){
//     opacity = (
//       orientation.x === 0 ?
//         (b + t)/2 :
//         1 - (b + t)/2
//     )
//     buffer.data[i*4 + 3] = opacity*255;
//     console.log(orientation);
//     }else if (typeof(l) ==='number' && typeof(r) === 'number'){
//     opacity = (
//       orientation.y === 0 ?
//         (l + r)/2 :
//         1 - (l + r)/2
//     )
//   buffer.data[i*4 + 3] = opacity*255;
// }else if (typeof(l) === 'number' && typeof(b) === 'number'){
//     const base = l;
//     const height = b;
//     const area = base * height / 2;
//     opacity = lt ? 0 : 0;
//     buffer.data[i*4 + 3] = opacity*255;
//
//   }else if (typeof(r) === 'number' && typeof(b) === 'number'){
//     const base = 1-r;
//     const height = b;
//     const area = base * height / 2;
//     opacity = lt ? 1 : 0;
//     buffer.data[i*4 + 3] = opacity*255;
//
//   }else if ( typeof(l) ==='number' && typeof(t) === 'number'){
//     const base = l;
//     const height = 1-t;
//     const area = base * height / 2;
//     opacity = lt ? 0 : 1;
//     buffer.data[i*4 + 3] = opacity*255;
//
//   }else if (typeof(r) === 'number' && typeof(t) ==='number'){
//     const base = 1-r;
//     const height = 1-t;
//     const area = base * height / 2;
//     opacity = lt ? 0 : 0;
//     buffer.data[i*4 + 3] = opacity*255;
//
//   }
// }
