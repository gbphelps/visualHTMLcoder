import { format, create } from '../utils';
import { colorInputCallback } from '../listeners/colorInputCallback';


export const initializeSwatch = () => {
  const swatch =
    create('DIV', container, {
      id: 'swatch'
    },{
      background: format(canvas.color)
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
      input.setAttribute('size', 3);
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
