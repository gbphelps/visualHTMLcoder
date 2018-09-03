import { create } from '../utils';
import { dragger2Callback } from '../listeners/dragger2Callback';


export const initializeDragger2 = (d2diameter) => {
  const dragger2 =
    create('DIV', triangleContainer, {
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

  const pip =
  create('DIV', dragger2, {
      id: 'pip'
    },{
      background: 'black',
      height: '10px',
      width: '10px',
      'border-radius': '50%',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      transition: 'height .3s , width .3s'
    });
};
