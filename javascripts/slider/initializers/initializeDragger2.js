import { create } from '../utils';
import { dragger2Callback } from '../listeners/dragger2Callback';


export const initializeDragger2 = (d2diameter) => {
  const dragger2 =
    create('DIV', triangleContainer, {
      id: 'dragger2',
      diameter: d2diameter,
      x: canvas.innerWidth/2,
      y: 0,
    },{
      height: d2diameter + 'px',
      width: d2diameter + 'px',
      borderRadius: '50%',
      left: (canvas.innerWidth - d2diameter)/2 + 'px',
      top: -d2diameter/2 + 'px'
    });



  const diameter = 20;
  const pip =
  create('DIV', dragger2, {
      id: 'pip',
      diameter
    },{
      display: 'flex',
      background: 'black',
      height: diameter + 'px',
      width: diameter + 'px',
      'z-index': 2,
      'border-radius': '50%',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      transition: 'height .3s , width .3s, transform .3s'
    });
  pip.addEventListener('mousedown', dragger2Callback);


  // const border = '1px solid black'
  // create('DIV', pip,{
  //   id: 'crosshair1'
  // },{
  //   position: 'absolute',
  //   'border-left': border,
  //   height: '6px',
  //   width: '1px',
  //   left: '50%',
  //   bottom: '-6px',
  // })
  //
  // create('DIV', pip,{
  //   id: 'crosshair2'
  // },{
  //   position: 'absolute',
  //   'border-left': border,
  //   height: '6px',
  //   width: '1px',
  //   left: '50%',
  //   top: '-6px'
  // })
  //
  // create('DIV', pip,{
  //   id: 'crosshair3'
  // },{
  //   position: 'absolute',
  //   'border-top': border,
  //   height: '1px',
  //   width: '6px',
  //   top: '50%',
  //   left: '-6px'
  // })
  //
  // create('DIV', pip,{
  //   id: 'crosshair4'
  // },{
  //   position: 'absolute',
  //   'border-top': border,
  //   height: '1px',
  //   width: '6px',
  //   top: '50%',
  //   right: '-6px',
  // })


  ///////TODO animate
  // const check = () => {
  //     if (!pip.active){
  //     pip.classList.remove('animate');
  //     clearInterval(pip.run);
  //   }
  // }
  //
  // triangleContainer.addEventListener('mouseenter',()=>{
  //   pip.active = true;
  //   pip.classList.add('animate');
  //   pip.run = setInterval(check,1000);
  // })
  //
  // triangleContainer.addEventListener('mouseleave',()=>{
  //   pip.active = false;
  // })
  ////////////

};
