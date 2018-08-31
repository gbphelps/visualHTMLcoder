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
    const green = document.createElement('INPUT');
    green.id = 'color-1';
    const blue = document.createElement('INPUT');
    blue.id = 'color-2';

    [red,green,blue].forEach(input => {
      input.setAttribute('size', 3);
      input.addEventListener('input',colorInputCallback);
      input.addEventListener('focus',e=>e.target.select())
    })

    create('SPAN', swatch, {innerHTML: 'rgb('});
    swatch.append(red);
    create('SPAN', swatch, {innerHTML: ','});
    swatch.append(green);
    create('SPAN', swatch, {innerHTML: ','});
    swatch.append(blue);
    create('SPAN', swatch, {innerHTML: ')'});
}
