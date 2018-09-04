import { create } from '../utils';
import { dragger2Callback } from '../listeners/dragger2Callback';


export const initializeDragger2 = (d2diameter) => {
  const dragger2 =
    create('DIV', triangleContainer, {
      id: 'dragger2',
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


  const pip =
  create('DIV', dragger2, {
      id: 'pip',
      width : 10 //TODO variables
    },{
      display: 'flex',
      background: 'black',
      height: '10px', //TODO variables
      width: '10px',
      'z-index': 2,
      'border-radius': '50%',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      transition: 'height .3s , width .3s'
    });
  pip.addEventListener('mousedown', dragger2Callback);


  const border = '1px solid rgba(255,255,255,.7)'
  create('DIV', pip,{
    id: 'crosshair1'
  },{
    position: 'absolute',
    'border-left': border,
    height: '10px',
    width: '1px',
    left: '50%',
    bottom: '-5px'
  })

  create('DIV', pip,{
    id: 'crosshair2'
  },{
    position: 'absolute',
    'border-left': border,
    height: '10px',
    width: '1px',
    left: '50%',
    top: '-5px'
  })

  create('DIV', pip,{
    id: 'crosshair3'
  },{
    position: 'absolute',
    'border-top': border,
    height: '1px',
    width: '10px',
    top: '50%',
    left: '-6px'
  })

  create('DIV', pip,{
    id: 'crosshair4'
  },{
    position: 'absolute',
    'border-top': border,
    height: '1px',
    width: '10px',
    top: '50%',
    right: '-6px'
  })

};
