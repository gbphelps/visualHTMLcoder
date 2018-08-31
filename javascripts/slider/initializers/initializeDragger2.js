import { create } from '../utils';
import { dragger2Callback } from '../listeners/dragger2Callback';


export const initializeDragger2 = (d2diameter) => {
  const dragger2 =
    create('DIV', picker, {
      id: 'dragger2',
      color: canvas.color,
      diameter: d2diameter,
      x: canvas.width/2,
      y: 0,
    },{
      height: d2diameter + 'px',
      width: d2diameter + 'px',
      borderRadius: '50%',
      left: (canvas.width - d2diameter)/2 + 'px',
      top: -d2diameter/2 + 'px'
    });
    dragger2.addEventListener('mousedown', dragger2Callback);
};
