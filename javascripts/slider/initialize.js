import { updateCanvas } from './updaters/updateCanvas';
import { updateDragger2 } from './updaters/updateDragger2';
import { updateSwatch } from './updaters/updateSwatch';

import { format, calcColor, create } from './utils'

import { dragger2Callback } from './listeners/dragger2Callback';

import { initializeSwatch } from './initializers/initializeSwatch';
import { initializeDragger2 } from './initializers/initializeDragger2';
import { initializeCanvas } from './initializers/initializeCanvas';


import { initializeCircleSlider } from './initializers/initializeCircleSlider';
import { initializeTrioSliders } from './initializers/initializeTrioSliders'




export const initialize = () => {

  const d2diameter = 50; //NOTE can be arbitrarily large, until it blocks other elements
  const sliderWidth = 10;
  const canvasWidth = 150;
  const sliderHeight = Math.round(canvasWidth*Math.sqrt(3)/2);

  const circleSliderWidth = 250;
  const circleSliderThickness = 10;
  const circleSliderDragger = 50; //NOTE can be arbitrarily large


  document.body.style.cursor = 'default';

  const container =
    create('DIV',document.body,{id: 'container'},{display: 'flex',height: '290px'});

  initializeCircleSlider(
    circleSliderWidth,
    circleSliderThickness,
    circleSliderDragger); //TODO fails on odd numbered widths
  initializeCanvas(canvasWidth);
  initializeDragger2(d2diameter);

  const rightContainer =
    create('DIV',container,{id: 'rightContainer'},{
      height: '100%',
      display: 'flex',
      'flex-direction': 'column',
      'justify-content': 'space-between',
      'align-items': 'center'});
  initializeSwatch(150); //TODO variable
  initializeTrioSliders();





  updateDragger2();
  updateSwatch();
}
