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



    const sliderStyle = {
        height: '10px',
        width: '200px',
        margin: '10px 0',
        position: 'relative',
    };

    const draggerStyle = {
      height: '50px',
      width: '50px',
      'border-radius': '50%',
      left: -25 + 'px',
      top: (10-50)/2 + 'px',
      position: 'absolute'
    };

    const pipStyle = color => {
      return {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        'border-radius': '50%',
        margin: 'auto',
        height: '20px',
        width: '20px',
        background: color,
        'z-index': 2,
        transition: 'height .3s, width .3s, box-shadow .3s',
        'box-shadow': '0 2px 2px 0 rgba(0,0,0,.4)'
      }
    };



    const trackStyle = {
      background: '#000',
      height: '100%',
      width: '195px',
      position: 'absolute',
      top: 0,
      left: '5px',
      'border-radius': '5px'
    }

    const redSlider =
      create('DIV', swatch,{
        id: 'redSlider',
        width: 200,
      }, sliderStyle)

    create('DIV', redSlider,{},trackStyle)

    const redDragger =
      create('DIV', redSlider,{
        id: 'redDragger',
        diameter: 50,
        status: 0
      },draggerStyle)


    const redPip =
      create('DIV', redDragger,{
        id: 'redPip'
      },pipStyle('red'))
    redPip.addEventListener('mousedown', draggerCallback('red'));

    const redProgress =
      create ('DIV', redSlider,{
        id: 'redProgress'
      },{
        height: '10px',
        width: 0,
        background: 'linear-gradient(to left, #f00, #f55 200px)',
        position:'absolute',
        top: 0,
        left: 0,
        'border-radius': '5px'
      })



    const greenSlider =
      create('DIV', swatch,{
        id: 'greenSlider',
        width: 200,
      },sliderStyle)

      create('DIV', greenSlider,{},trackStyle)

    const greenDragger =
      create('DIV', greenSlider,{
        id: 'greenDragger',
        diameter: 50,
        status: 0
      },draggerStyle)


    const greenPip =
      create('DIV', greenDragger,{
        id: 'greenPip'
      },pipStyle('lime'));
    greenPip.addEventListener('mousedown', draggerCallback('green'));

    const greenProgress =
      create ('DIV', greenSlider,{
        id: 'greenProgress'
      },{
        height: '10px',
        width: 0,
        background: 'linear-gradient(to left,#0f0, #7f7 200px)',
        position:'absolute',
        top: 0,
        left: 0,
        'border-radius': '5px'
      })




    const blueSlider =
      create('DIV', swatch,{
        id: 'blueSlider',
        width: 200,
      },sliderStyle)

      create('DIV', blueSlider,{},trackStyle)

    const blueDragger =
      create('DIV', blueSlider,{
        id: 'blueDragger',
        diameter: 50,
        status: 0
      },draggerStyle)


    const bluePip =
      create('DIV', blueDragger,{
        id: 'bluePip'
      },pipStyle('blue'));
    bluePip.addEventListener('mousedown', draggerCallback('blue'));

    const blueProgress =
      create ('DIV', blueSlider,{
        id: 'blueProgress'
      },{
        height: '10px',
        width: 0,
        background: 'linear-gradient(to left,#00f, #44f 200px)',
        position:'absolute',
        top: 0,
        left: 0,
        'border-radius': '5px'
      })








}
