import { updateCanvas } from './updaters/updateCanvas';
import { updateDragger2 } from './updaters/updateDragger2';
import { updateSwatch } from './updaters/updateSwatch';

import { format, calcColor, create } from './utils'

import { dragger2Callback } from './listeners/dragger2Callback';

import { initializeSwatch } from './initializers/initializeSwatch';
import { initializeDragger2 } from './initializers/initializeDragger2';
import { initializeCanvas } from './initializers/initializeCanvas';


import { initializeCircleSlider } from './initializers/initializeCircleSlider';




export const initialize = () => {

  const d2diameter = 50; //NOTE can be arbitrarily large, until it blocks other elements
  const sliderWidth = 10;
  const canvasWidth = 200;
  const sliderHeight = Math.round(canvasWidth*Math.sqrt(3)/2);

  const circleSliderWidth = 300;
  const circleSliderThickness = 5;
  const circleSliderDragger = 50; //NOTE can be arbitrarily large


  document.body.style.cursor = 'default';

  const container =
    create('DIV',document.body,{id: 'container'},{display: 'flex'});

  initializeCircleSlider(
    circleSliderWidth,
    circleSliderThickness,
    circleSliderDragger); //TODO fails on odd numbered widths
  initializeCanvas(canvasWidth);
  initializeDragger2(d2diameter);
  initializeSwatch();



  updateDragger2();
  updateSwatch();
}
