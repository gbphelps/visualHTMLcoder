import { create } from '../utils';
import { circleDraggerCallback } from '../listeners/circleDraggerCallback'


export const initializeCircleSlider = (canvasWidth, spectrumWidth, dragDiam) => {
  const spectrumContainer = create('DIV', document.body,{
    id: 'spectrumContainer',
    width: canvasWidth
  },{
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
  populateBuffer(buffer, canvasWidth/2 - spectrumWidth);
}



const fillPixel = (buffer, i, color) => {
  buffer.data[i*4 + 0] = color[0];
  buffer.data[i*4 + 1] = color[1];
  buffer.data[i*4 + 2] = color[2];
  buffer.data[i*4 + 3] = 255;
};


const populateBuffer = (buffer, innerRadius) => {

  for (let i = 0; i < circleSlider.width * circleSlider.width; i++){

    let left = i % circleSlider.width;
    const x = left - circleSlider.width/2;

    let bottom = circleSlider.width - Math.floor(i / circleSlider.width);
    const y = bottom - circleSlider.width/2;


    let progress=0;
    if (x < 0){
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3;
    } else {
      progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3 + 3;
    }

    const color = calcColor(progress);

    const rSquare = x*x + y*y;
    if ( rSquare < circleSlider.width*circleSlider.width/4 && rSquare > innerRadius* innerRadius){
      fillPixel(buffer,i,color)
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
