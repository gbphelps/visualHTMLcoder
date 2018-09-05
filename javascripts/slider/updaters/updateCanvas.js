import { format } from '../utils';

export const updateCanvas = color => {

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  canvas.color = color;

  const buffer = ctx.createImageData(canvas.innerWidth, canvas.innerHeight);

  populateBuffer(buffer);
  ctx.putImageData(buffer, canvas.padding, canvas.padding);
  outline(buffer);

};


const XtoY = x => {
  return x < 0 ?
    Math.sqrt(3) * (canvas.innerWidth/2 + x) :
    Math.sqrt(3) * (canvas.innerWidth/2 - x)
}

const YtoX = y => {
    return - y / Math.sqrt(3) + canvas.innerWidth/2
}


const alii = {};
const triangleCoords = {};

let antiAliased = false;
let coordsCalculated = false;


//TODO: cache theta & r for i to improve speed
const calculateCoords = i => {
  const top = Math.floor(i / canvas.innerWidth);
  const left = Math.floor(i % canvas.innerWidth);

  const x = left;
  const y = canvas.innerHeight - top -1;
  //TODO -1 FOR pixel misalignment with rounded border

  const xAvg = x + .5;
  const yAvg = y - .5

  let theta0 = Math.atan(yAvg/xAvg);
  const theta = (Math.PI/3 - theta0)/(Math.PI/3);
  //map radial coordinates [0, pi/3] -> [1, 0]

  let r = Math.sqrt(xAvg*xAvg + yAvg*yAvg)/canvas.innerWidth;
  r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2)
  //map pie wedge to equilateral triangle by flattening arc
  triangleCoords[i] = {x,y,theta,r};
  return {x,y,theta,r};
}



//TODO TODO: just iterating thru buffer is causing lag.
//possible to stop iterating through dead points?
//possible also to set opacity on black and white but have a bg color set
//to canvas.color? native algorithms may be faster.

const populateBuffer = (buffer) => {
  const [red, green, blue] = canvas.color;

  for (let i=0; i<(canvas.innerHeight * canvas.innerWidth); i++) {

    let x,y,theta,r;
    if (coordsCalculated){
      ({x,y,theta,r} = triangleCoords[i])
    }else{
      ({x,y,theta,r} = calculateCoords(i))
    }

    buffer.data[i*4 + 0] =
      (red + (255 - red) * theta) * r;
    buffer.data[i*4 + 1] =
      (green + (255 - green) * theta) * r;
    buffer.data[i*4 + 2] =
      (blue  + (255 - blue) * theta) * r;
    if (!(theta < 0 || theta > 1 || r > 1)){
      buffer.data[i*4 + 3] = 255;
    }else{
      buffer.data[i*4 + 3] = 0;
    }

    //TODO anti-aliasing turned off
    // if (antiAliased){
    //   if (n(alii[i])) buffer.data[i*4 + 3] = alii[i];
    // } else {
    //   antiAlias(x-canvas.innerWidth/2, y, buffer, i);
    // }
  }
  antiAliased = true;
  coordsCalculated = true;
};





//TODO run this only once, calculate all of the XY issues,
//apply same antiAliasing @ i always
const antiAlias = (x, y, buffer, i) => {

  const left = x;
  const right = x + 1;
  const top = y;
  const bottom = y - 1;
  const collision = {};

  if (
    left <= YtoX(top) && YtoX(top) <= right ||
    left <= -YtoX(top) && -YtoX(top) <= right
     ){
    //top collision
    collision.top = x > 0 ? YtoX(top)-left : -YtoX(top)-left;
  }

  if (
    left <= YtoX(bottom) && YtoX(bottom) <= right ||
    left <= -YtoX(bottom) && -YtoX(bottom) <= right
  ){
    //bottom collision
    collision.bottom = x > 0 ? YtoX(bottom)-left : -YtoX(bottom)-left;
  }

  if (
    bottom <= XtoY(left) && XtoY(left) <= top
  ){
    //left collision
    collision.left = XtoY(left)-bottom;
  }

  if (
    bottom <= XtoY(right) && XtoY(right) <= top
  ){
    //right collision
    collision.right = XtoY(right)-bottom;
  }

  if (Object.keys(collision).length){
    const orientation = x >= 0 ?
      {x: 0, y: 0} : {x: 1, y: 0}
    setOpacity(collision, orientation, buffer, i, true);
  }
};


const n = (number) => typeof(number) === 'number' ? true : false;
const setOpacity = ({left,right,top,bottom}, orientation, buffer, i, convex) => {
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
          bottom * left / 2 :
          1 - bottom * left / 2

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

  } else if (n(top) && n(right)) {
    opacity =
      orientation.x === 1 && orientation.y === 1 ?
        (1-top)*(1-right)/2 :
        1 - (1-top)*(1-right)/2

  }

  if ([left,right,top,bottom].some(el=>n(el))){
    buffer.data[i*4 + 3] = convex ?
      opacity * 255 :
      (1-opacity) * 255;

    alii[i] = buffer.data[i*4 + 3];
  }


}










const outline = () => {

  const borderRadius = 10;
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.fillStyle = format(canvas.color);
  ctx.arc(canvas.width/2, canvas.padding, borderRadius, Math.PI, Math.PI*2);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(canvas.padding, canvas.height - canvas.padding, borderRadius, Math.PI/3, Math.PI+Math.PI/3);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.arc(canvas.width - canvas.padding, canvas.height - canvas.padding, borderRadius, -Math.PI/3, Math.PI-Math.PI/3);
  ctx.fill();


  ctx.beginPath();
  const b2w = ctx.createLinearGradient(
    canvas.padding, 0,
    canvas.padding + canvas.innerWidth, 0,
  );
  b2w.addColorStop(0,'black');
  b2w.addColorStop(1,'white');
  ctx.fillStyle = b2w;
  ctx.rect(canvas.padding, canvas.height-canvas.padding-1, canvas.innerWidth, borderRadius + 1)
  ctx.fill();



  ctx.beginPath();
  const r2w = ctx.createLinearGradient(
    canvas.width/2, canvas.padding,
    canvas.width - canvas.padding, canvas.height - canvas.padding,
  );
  r2w.addColorStop(1,'white');
  r2w.addColorStop(0, format(canvas.color));
  ctx.fillStyle = r2w;
  ctx.moveTo(canvas.width/2, canvas.padding);
  ctx.lineTo(canvas.width-canvas.padding, canvas.height-canvas.padding);
  ctx.lineTo(canvas.width-canvas.padding + borderRadius*Math.cos(Math.PI/6), canvas.height-canvas.padding - borderRadius*Math.sin(Math.PI/6))
  ctx.lineTo(canvas.width/2 + borderRadius*Math.cos(Math.PI/6), canvas.padding - borderRadius*Math.sin(Math.PI/6));
  ctx.lineTo(canvas.width/2, canvas.padding);
  ctx.fill();



  ctx.beginPath();
  const r2b = ctx.createLinearGradient(
    canvas.width/2, canvas.padding,
    canvas.padding, canvas.height - canvas.padding,
  );
  r2b.addColorStop(1,'black');
  r2b.addColorStop(0, format(canvas.color));
  ctx.fillStyle = r2b;
  ctx.moveTo(canvas.width/2, canvas.padding);
  ctx.lineTo(canvas.padding, canvas.height-canvas.padding);
  ctx.lineTo(canvas.padding - borderRadius*Math.cos(Math.PI/6), canvas.height-canvas.padding - borderRadius*Math.sin(Math.PI/6))
  ctx.lineTo(canvas.width/2 - borderRadius*Math.cos(Math.PI/6), canvas.padding - borderRadius*Math.sin(Math.PI/6));
  ctx.lineTo(canvas.width/2, canvas.padding);
  ctx.fill();
}
