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
      'border-radius': '50%',
      'box-shadow': '0 2px 2px 0 rgba(0,0,0,.4)',
      top: '20px'
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
    redHolder.classList.add('vertical-center');
    create('SPAN', redHolder,{innerHTML:'R'});
    redHolder.append(red);

    const greenHolder = create('DIV', inputContainer);
    greenHolder.classList.add('vertical-center');
    create('SPAN', greenHolder,{innerHTML:'G'});
    greenHolder.append(green);

    const blueHolder = create('DIV', inputContainer);
    blueHolder.classList.add('vertical-center');
    create('SPAN', blueHolder,{innerHTML:'B'});
    blueHolder.append(blue);

    const copyHolder = create('DIV', swatch,{},{
      height: '35px',
      width: '35px',
      position: 'absolute',
      top: 0,
      left: 0,
    })
    const copyButton = create('DIV', copyHolder, {
      id: 'copyButton',
      innerHTML: '<i class="fas fa-copy"></i>'
    })

    //hacky solution, but display:none and visibility:hidden
    //prevent selection of text.
    copyButton.addEventListener('mousedown',()=>{
      const defaultStyle = Object.assign({},copyButton.style);
      const MDStyle = {
        height: '33px',
        width: '33px',
        'line-height': '33px',
        'font-size': '15px',
        'box-shadow': 'none',
      }
      Object.assign(copyButton.style, MDStyle);
      const text = document.createElement('TEXTAREA');
      text.value = pip.style.background;
      text.setAttribute('readonly','');
      text.style = {position: 'absolute', left: '-9999px'};
      document.body.append(text);
      text.select();
      document.execCommand('copy');
      text.remove();
      document.addEventListener('mouseup',()=>{
        copyButton.style = defaultStyle;
      },{once:true})
    });

  

}
