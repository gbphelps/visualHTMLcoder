import { create } from '../utils';
import { updateCanvas } from '../updaters/updateCanvas';

export const initializeCanvas = (canvasWidth) => {

  const padding = 20;
  const height = Math.round(canvasWidth*Math.sqrt(3)/2);

  const triangleContainer = create('DIV',spectrumContainer, {
    id: 'triangleContainer'
  },{
    height: Math.round(canvasWidth*Math.sqrt(3)/2),
    width: canvasWidth,
    position: 'absolute',
    top: circleSlider.height/2 - height + canvasWidth/(2*Math.sqrt(3)) + 'px',
    left: (circleSlider.width - canvasWidth)/2 + 'px',
  });

  const canvas = create('CANVAS', triangleContainer, {
    id: 'canvas',
    height: Math.round(canvasWidth*Math.sqrt(3)/2)+padding*2,
    width: canvasWidth+padding*2,
    innerHeight: Math.round((canvasWidth)*Math.sqrt(3)/2),
    innerWidth: canvasWidth,
    padding
  },{
    //background: 'white',
    position: 'absolute',
    left: -padding + 'px',
    top: -padding+ 'px'
  });

  // const topCorner = create('DIV', triangleContainer, {
  // },{
  //   background: 'red',
  //   height: '17px',
  //   width: '17px',
  //   'border-radius': '50%',
  //   position: 'absolute',
  //   top: -17/2 + 'px',
  //   left: (canvasWidth - 17)/2 + 'px',
  //   'z-index': 0
  // })
  //
  // const rightCorner = create('DIV', triangleContainer, {
  // },{
  //   background: 'white',
  //   height: '17px',
  //   width: '17px',
  //   'border-radius': '50%',
  //   position: 'absolute',
  //   top: height - 17/2 + 'px',
  //   left: canvasWidth - 17/2 + 'px',
  //   'z-index': 0
  // })
  //
  // const leftCorner = create('DIV', triangleContainer, {
  // },{
  //   background: 'black',
  //   height: '17px',
  //   width: '17px',
  //   'border-radius': '50%',
  //   position: 'absolute',
  //   top: height - 17/2 + 'px',
  //   left: - 17/2 + 'px',
  //   'z-index': 0
  // })
  //
  // const bottom = create('DIV', triangleContainer, {
  // },{
  //   background: 'linear-gradient(to right, black, white)',
  //   height: 17/2 + 'px',
  //   width: '100%',
  //   position: 'absolute',
  //   top: height + 'px',
  //   left: 0 + 'px',
  //   'z-index': 0
  // })
  //
  // const right = create('DIV', triangleContainer, {
  // },{
  //   background: 'linear-gradient(to bottom, red, white)',
  //   width: 18/2 + 'px',
  //   height: canvasWidth + 'px',
  //   position: 'absolute',
  //   top: 1 + 'px',
  //   left: canvasWidth/2 + 'px',
  //   'z-index': 0,
  //   transform : 'rotate(-30deg)',
  //   'transform-origin': '0 0'
  // })
  //
  // const left = create('DIV', triangleContainer, {
  // },{
  //   background: 'linear-gradient(to bottom, red, black)',
  //   width: 10 + 'px',
  //   height: canvasWidth + 'px',
  //   position: 'absolute',
  //   top: -2 + 'px',
  //   left: canvasWidth/2 - 10+ 'px',
  //   'z-index': 0,
  //   transform : 'rotate(30deg)',
  //   'transform-origin': '0 0'
  // })




  updateCanvas([255, 0, 0, 255]);
  const ctx = canvas.getContext('2d');
}
