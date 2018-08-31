import { create } from './utils';
import { updateCanvas } from './updaters/updateCanvas';

export const initializeCanvas = (canvasWidth) => {
  const canvas = create('CANVAS', picker, {
    id: 'canvas',
    height: Math.round(canvasWidth*Math.sqrt(3)/2),
    width: canvasWidth,
  });

  updateCanvas([255, 0, 0, 255]);
  const ctx = canvas.getContext('2d');
}
