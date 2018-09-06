import { updateCanvas } from '../updaters/updateCanvas';
import { format, calcColor } from '../utils';
import { updateSwatch } from '../updaters/updateSwatch';
import { updateDragger2 } from '../updaters/updateDragger2';
import { updateTrioDraggers } from '../updaters/updateTrioDraggers'


export const circleDraggerCallback = e => {
  e.preventDefault();
  let [ xPrev, yPrev ] = [ e.clientX, e.clientY ];
  circlePip.style.height = '35px';
  circlePip.style.width = '35px';
  circlePip.style['box-shadow'] = '0 8px 8px 0 rgba(0,0,0,.4)';
  document.body.classList.add('grabbing');

  const mousemove = e => {

    const diffx = e.clientX - xPrev;
    const diffy = e.clientY - yPrev;

    const m = [diffx, -diffy];

    const magnitude2 =
      circleDragger.y*circleDragger.y + circleDragger.x*circleDragger.x;
    const tangent = [-circleDragger.y, circleDragger.x];
    const scale = (m[0]*tangent[0] + m[1]*tangent[1])/magnitude2;


    let x, y;

    const radius = (spectrumContainer.width/2 - circleSlider.thickness)/2 + spectrumContainer.width/4;
    if (Math.abs(tangent[0]) > Math.abs(tangent[1])){
      x = circleDragger.x + tangent[0]*scale;
      if (circleDragger.y > circleDragger.x){
        y = Math.sqrt(radius*radius - x * x);
      } else {
        y = -Math.sqrt(radius*radius - x * x);
      }
    }else{
      y = circleDragger.y + tangent[1]*scale;
      if (-Math.abs(circleDragger.y) < circleDragger.x){
        x = Math.sqrt(radius*radius - y * y)
      } else {
        x = -Math.sqrt(radius*radius - y * y)
      }
    }


    //fix fast-drag errors
    if (Math.abs(x) > radius){
      x = radius;
      y = 0;
    }
    if (Math.abs(y) > radius){
      y = radius;
      x = 0;
    }

    setDraggerPosition({x, y});



    xPrev = e.clientX;
    yPrev = e.clientY;
  }

  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', ()=>{
    document.removeEventListener('mousemove', mousemove);
    document.body.classList.remove('grabbing')
    circlePip.style.height = circlePip.diameter + 'px';
    circlePip.style.width = circlePip.diameter + 'px';
    circlePip.style['box-shadow'] = '0 2px 2px 0 rgba(0,0,0,.4)';
  },{once: true})

}

export const setDraggerPosition = ({ x, y }) => {
  const left = (x + spectrumContainer.width/2) - circleDragger.diameter/2;
  const top = (spectrumContainer.width/2 - y) - circleDragger.diameter/2;


  let theta;
  if (x < 0){
    theta = Math.atan(y/x) + Math.PI/2;
  } else {
    theta = Math.atan(y/x) + 3/2 * Math.PI;
  }

  const progress = 3 * theta / Math.PI;
  const color = calcColor(progress);
  circleDragger.x = x;
  circleDragger.y = y;
  circleDragger.style.left = left + 'px';
  circleDragger.style.top = top + 'px';
  circlePip.style.background = format(color);

  updateCanvas(calcColor(progress));
  updateDragger2();
  updateTrioDraggers({
    red: dragger2.color[0]/255*200,
    green: dragger2.color[1]/255*200,
    blue: dragger2.color[2]/255*200
  });
  updateSwatch();
}
