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
    const green = document.createElement('INPUT');
    green.last = 0;
    green.id = 'color-1';
    const blue = document.createElement('INPUT');
    blue.last = 0;
    blue.id = 'color-2';

    [red,green,blue].forEach(input => {
      input.addEventListener('input',colorInputCallback);
      input.addEventListener('focus',e=>e.target.select());
    })

    const inputContainer = create('DIV', swatch, {
        id: 'inputContainer'
      });

    create('SPAN', inputContainer, {innerHTML: 'rgb('});
    inputContainer.append(red);
    create('SPAN', inputContainer, {innerHTML: ','});
    inputContainer.append(green);
    create('SPAN', inputContainer, {innerHTML: ','});
    inputContainer.append(blue);
    create('SPAN', inputContainer, {innerHTML: ')'});
}
