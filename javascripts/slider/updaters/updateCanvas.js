import { format } from '../utils';

export const updateCanvas = color => {

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.color = color;

  const buffer = ctx.createImageData(canvas.width, canvas.height);

  populateBuffer(buffer);
  ctx.putImageData(buffer, 0, 0);
  antiAlias(canvas);
};

const populateBuffer = (buffer) => {
  const {width, height, color} = document.getElementById('canvas');

  for (let i=0; i<(height * width); i++) {
    const top = Math.floor(i / width);
    const left = Math.floor(i % width);

    const xp = left;
    const yp = height - top;

    let theta0 = Math.atan(yp/xp);
    const theta = (Math.PI/3 - theta0)/(Math.PI/3);
    //map radial coordinates [0, pi/3] -> [1, 0]

    let r = Math.sqrt(xp*xp + yp*yp)/canvas.width;
    r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2)
    //map pie wedge to equilateral triangle by flattening arc

    if (theta < 0 || theta > 1 || r > 1){
    }else{
      buffer.data[i*4 + 0] =
        (color[0] + (255-color[0])*theta) * r;
      buffer.data[i*4 + 1] =
        (color[1] + (255-color[1])*theta) * r;
      buffer.data[i*4 + 2] =
        (color[2] + (255-color[2])*theta) * r;
      buffer.data[i*4 + 3] = 255;
    }
  }
};


const antiAlias = (canvas) => {
  const ctx = canvas.getContext('2d');

  const g1 = ctx.createLinearGradient(0, 0, canvas.width/2, 0);
  g1.addColorStop(0, 'black');
  g1.addColorStop(1, format(canvas.color));

  const g2 = ctx.createLinearGradient(canvas.width/2, 0, canvas.width, 0);
  g2.addColorStop(0, format(canvas.color));
  g2.addColorStop(1, 'white');

  ctx.beginPath();
    ctx.moveTo(1, canvas.height -.5);
    ctx.lineTo(canvas.width/2 + .5, .5);
    ctx.strokeStyle = g1;
    ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
    ctx.moveTo(canvas.width/2 + .5, .5);
    ctx.lineTo(canvas.width, canvas.height -.5);
    ctx.strokeStyle = g2;
    ctx.stroke();
  ctx.closePath();
};
