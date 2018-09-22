import { create } from '../utils';
import { draggerCallback } from '../archive/draggerCallback'

export const initializeTrioSliders = () => {

  const sliderStyle = {
      height: '10px',
      width: '200px',
      margin: '20px 0',
      position: 'relative',
  };

  const draggerStyle = {
    height: '50px',
    width: '50px',
    'border-radius': '50%',
    left: -25 + 'px',
    top: (10-50)/2 + 'px',
    position: 'absolute',
    cursor: 'url(https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur), default'
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
    width: '199px',
    position: 'absolute',
    top: 0,
    left: '1px',
    'border-radius': '5px',
    'box-shadow': '0 8px 8px 0 rgba(0,0,0,.2)'
  }


  const offset = 10
  const radius = offset + 20 + spectrumContainer.width/2;

  //(distance from circle) + (margin between sliders)*n + sliderHeight/2
  const heights = [
    offset + 25,
    offset + 55,
    offset + 85
  ]
  let xCoords = heights.map(y => Math.sqrt(radius*radius - (radius-y)*(radius-y)));
  xCoords = xCoords.map(el => el - xCoords[1]-40);
  console.log(xCoords);





  const triadContainer = create('DIV',rightContainer,{
    id: 'triadContainer'
  },{
    //background: 'linear-gradient(140deg,#333,black)',
    padding: ' 0 20px',
    //'border-bottom': '1px solid black'
  });

  const redSlider =
    create('DIV', triadContainer,{
      id: 'redSlider',
      width: 200,
    }, sliderStyle)
  redSlider.style.left = xCoords[2] + 'px';

  create('DIV', redSlider,{},trackStyle)

  const redDragger =
    create('DIV', redSlider,{
      id: 'redDragger',
      diameter: 50,
      status: 200
    },draggerStyle)
  redDragger.style.left = 200 - 25 + 'px'


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
      width: '200px',
      background: 'linear-gradient(to left, #f00, #f55 200px)',
      position:'absolute',
      top: 0,
      left: 0,
      'border-radius': '5px'
    })



  const greenSlider =
    create('DIV', triadContainer,{
      id: 'greenSlider',
      width: 200,
    },sliderStyle)
  greenSlider.style.left = xCoords[1] + 'px';

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
    create('DIV', triadContainer,{
      id: 'blueSlider',
      width: 200,
    },sliderStyle)
  blueSlider.style.left = xCoords[0] + 'px';

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
