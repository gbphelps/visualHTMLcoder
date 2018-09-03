import { create } from '../utils';
import { updateCanvas } from '../updaters/updateCanvas';

export const initializeCanvas = (canvasWidth) => {


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
    height: Math.round(canvasWidth*Math.sqrt(3)/2),
    width: canvasWidth,
  });

  updateCanvas([255, 0, 0, 255]);
  const ctx = canvas.getContext('2d');
}
