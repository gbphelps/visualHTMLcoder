import { format, create } from '../utils';
import { colorInputCallback } from '../listeners/colorInputCallback';
import { draggerCallback } from '../archive/draggerCallback'


export const initializeSwatch = (containerWidth) => {
  const swatch =
    create('DIV', container, {
      id: 'swatch'
    },{
      position: 'relative',
      background: format(canvas.color),
      height: containerWidth + 'px',
      width: containerWidth + 'px',
      'border-radius': '50%'
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

    const redSlider =
      create('DIV', swatch,{
        id: 'redSlider',
        width: 200,
      },{
        height: '10px',
        width: '200px',
        background: 'black',
        'border-radius': '5px',
        margin: '10px 0',
        position: 'relative'
      })

    const redDragger =
      create('DIV', redSlider,{
        id: 'redDragger',
        diameter: 50,
        status: 0
      },{
        height: '50px',
        width: '50px',
        background: 'black',
        'border-radius': '50%',
        left: -25 + 'px',
        top: -25 + 'px',
        position: 'absolute'
      })
    redDragger.addEventListener('mousedown', draggerCallback('red'));



    const greenSlider =
      create('DIV', swatch,{
        id: 'greenSlider',
        width: 200,
      },{
        height: '10px',
        width: '200px',
        background: 'black',
        'border-radius': '5px',
        margin: '10px 0',
        position: 'relative'
      })

    const greenDragger =
      create('DIV', greenSlider,{
        id: 'greenDragger',
        diameter: 50,
        status: 0
      },{
        height: '50px',
        width: '50px',
        background: 'black',
        'border-radius': '50%',
        left: -25 + 'px',
        top: -25 + 'px',
        position: 'absolute'
      })
    greenDragger.addEventListener('mousedown', draggerCallback('green'));





    const blueSlider =
      create('DIV', swatch,{
        id: 'blueSlider',
        width: 200,
      },{
        height: '10px',
        width: '200px',
        background: 'black',
        'border-radius': '5px',
        margin: '10px 0',
        position: 'relative'
      })

    const blueDragger =
      create('DIV', blueSlider,{
        id: 'blueDragger',
        diameter: 50,
        status: 0
      },{
        height: '50px',
        width: '50px',
        background: 'black',
        'border-radius': '50%',
        left: -25 + 'px',
        top: -25 + 'px',
        position: 'absolute'
      })
    blueDragger.addEventListener('mousedown', draggerCallback('blue'));








}
