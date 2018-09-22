import { format, create } from '../utils';
import { colorInputCallback } from '../listeners/colorInputCallback';
import { draggerCallback } from '../archive/draggerCallback'


export const initializeSwatch = (containerWidth) => {
  const swatch =
    create('DIV', rightContainer, {
      id: 'swatch'
    },{
      position: 'relative',
      background: format(canvas.color),
      height: containerWidth + 'px',
      width: containerWidth + 'px',
      left: '30px',
      top: '20px',
      'border-radius': '50%',
      'box-shadow': '0 8px 8px 0 rgba(0,0,0,.2)'
    });

    const red = document.createElement('INPUT');
    red.id = 'color-0';
    red.last = 255;
    //these are the saved previous inputs in case of invalid user input
    const green = document.createElement('INPUT');
    green.last = 0;
    green.id = 'color-1';
    const blue = document.createElement('INPUT');
    blue.last = 0;
    blue.id = 'color-2';

    [red,green,blue].forEach(input => {
      input.addEventListener('input',colorInputCallback);
      //input.addEventListener('focus',e=>e.target.select());
    })

    const inputContainer = create('DIV', swatch, {
        id: 'inputContainer'
      });

    const redHolder = create('DIV', inputContainer);
    create('SPAN', redHolder, {innerHTML: 'R'});
    redHolder.append(red);

    const greenHolder = create('DIV', inputContainer);
    create('SPAN', greenHolder, {innerHTML: 'G'});
    greenHolder.append(green);

    const blueHolder = create('DIV', inputContainer);
    create('SPAN', blueHolder, {innerHTML: 'B'});
    blueHolder.append(blue);
}
