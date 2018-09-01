import { create } from '../utils';
import { circleDraggerCallback } from '../listeners/circleDraggerCallback'


export const initializeCircleSlider = (canvasWidth, spectrumWidth, dragDiam=20) => {
  const spectrumContainer = create('DIV', document.body,{
    id: 'spectrumContainer',
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
  });

  const circleDragger = create('DIV', spectrumContainer, {
    id: 'circleDragger',
    height: dragDiam,
    width: dragDiam
  },{
    height: dragDiam + 'px',
    width: dragDiam + 'px',
    'border-radius': '50%',
    background: 'black',
    position: 'absolute',
    top: (spectrumWidth - dragDiam)/2 + 'px',
    left: (canvasWidth - dragDiam)/2 + 'px'
  })
  circleDragger.addEventListener('mousedown', circleDraggerCallback);

  const ctx2 = circleSlider.getContext('2d');

  const buffer = ctx2.createImageData(canvasWidth, canvasWidth);
  populateBuffer(buffer, 1 - spectrumWidth*2/canvasWidth);
}



const fillPixel = (buffer, i, color) => {
  buffer.data[i*4 + 0] = color[0];
  buffer.data[i*4 + 1] = color[1];
  buffer.data[i*4 + 2] = color[2];
  buffer.data[i*4 + 3] = 255;
};


const populateBuffer = (buffer, innerRadius) => {
  console.log(innerRadius);
  let deadPixels = [];

  let leftAlias = [];
  let topAlias = [];
  let rightAlias = [];
  let bottomAlias = [];

  for (let i = 0; i < circleSlider.width * circleSlider.width; i++){

    let left = i % circleSlider.width;
    const x = (left / circleSlider.height) * 2 - 1;

    let top = circleSlider.height - Math.floor(i / circleSlider.width);
    const y = (top / circleSlider.height) * 2 - 1;


    let progress=0;
    if (x < 0){
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3;
    } else {
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3 + 3;
    }

    const color = calcColor(progress);

    const rSquare = x*x + y*y;
    if ( rSquare < 1 && rSquare > innerRadius* innerRadius){
      if (deadPixels[i-1]) leftAlias[i] = {x, y};
      if (deadPixels[i-circleSlider.width]) topAlias[i] = {x, y};
      fillPixel(buffer,i,color)
    }else{
      deadPixels[i] = true;
      if (!deadPixels[i-1]) rightAlias[i-1] = { x, y };
      if (!deadPixels[i-circleSlider.width]) bottomAlias[i-circleSlider.width] = { x, y };
    }
  }

  const ctx = circleSlider.getContext('2d');
  ctx.putImageData(buffer,0,0);
}





//TODO find boundary. if x < 0 find error. if x > 0 find error next time.
//TODO find negative boundary. figure out where to place.


export const calcColor = progress => {
    let inc = 255 * (progress - Math.floor(progress));

    switch (Math.floor(progress)){
      case 0:
        return [255, inc, 0]
      case 1:
        return [255-inc, 255, 0]
      case 2:
        return [0, 255, inc]
      case 3:
        return [0, 255-inc, 255]
      case 4:
        return [inc, 0, 255]
      case 5:
        return [255, 0, 255-inc]
      case 6:
        return [255, 0, 0]
    }
}


//
// for (let i=0; i < circleSlider.width * circleSlider.width; i++){
//
//   let x, y, radius, coordShould, err;
//   if (bottomAlias[i]) {
//     ({ x, y } = bottomAlias[i]);
//     radius = (y < 0 ? 1 : Math.sqrt(.7) );
//     coordShould = Math.sqrt(radius*radius - x*x);
//     err = 1 - Math.abs(Math.abs(y) - coordShould)*circleSlider.height;
//
//
//   } else
//   if (topAlias[i]) {
//     ({ x, y } = topAlias[i]);
//     radius = (y > 0 ? 1 : Math.sqrt(.7) );
//     coordShould = Math.sqrt(radius*radius - x*x);
//     err = Math.abs(Math.abs(y) - coordShould)*circleSlider.height;
//
//   } else
//   if (leftAlias[i]) {
//     ({ x, y } = leftAlias[i]);
//     radius = (x < 0 ? 1 : Math.sqrt(.7) );
//     coordShould = Math.sqrt(radius*radius - y*y);
//     err = Math.abs(Math.abs(x) - coordShould)*circleSlider.height;
//
//   } else
//   if (rightAlias[i]) {
//     ({ x, y } = rightAlias[i]);
//     radius = (x > 0 ? 1 : Math.sqrt(.7) );
//     coordShould = Math.sqrt(radius*radius - y*y);
//     err = 1 - Math.abs(Math.abs(x) - coordShould)*circleSlider.height;
//   } else {
//     continue;
//   }
//
//   let a = 255 * err;
//   if (a < 0) a = 0;
//
//   buffer.data[i*4 + 3] = a;
// }
