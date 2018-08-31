import { updateCanvas } from './updaters/updateCanvas';
import { updateDragger2 } from './updaters/updateDragger2';
import { updateSwatch } from './updaters/updateSwatch';

import { format, calcColor, create } from './utils'

import { dragger2Callback } from './listeners/dragger2Callback';
import { draggerCallback } from './listeners/draggerCallback';

import { initializeSwatch } from './initializeSwatch';
import { initializeDragger } from './initializeDragger';
import { initializeDragger2 } from './initializeDragger2';



export const initialize = () => {

  const d1diameter = 20;
  const d2diameter = 30;
  const sliderWidth = 10;
  const canvasWidth = 200;
  const sliderHeight = Math.round(canvasWidth*Math.sqrt(3)/2);

  document.body.style.cursor = 'default';

  const container = create('DIV',document.body,{
    id: 'container'
  },{
    display: 'flex'
  });

  const picker = create('DIV', container, {
    id:'picker'
  });

  const canvas = create('CANVAS', picker, {
    id: 'canvas',
    height: Math.round(canvasWidth*Math.sqrt(3)/2),
    width: canvasWidth,
  });

  updateCanvas([255, 0, 0, 255]);
  const ctx = canvas.getContext('2d');


  const slider =
    create('DIV', container, {
      id: 'slider',
      height: sliderHeight,
      width: sliderWidth
    },{
      position: 'relative',
      width: sliderWidth + 'px',
      height: sliderHeight + 'px'
    });

  initializeDragger2(d2diameter);
  initializeDragger(d1diameter);
  initializeSwatch();

  updateDragger2();
  updateSwatch();
}
