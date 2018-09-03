import { updateCanvas } from '../updaters/updateCanvas';
import { format, calcColor } from '../utils';
import { updateSwatch } from '../updaters/updateSwatch';
import { updateDragger2 } from '../updaters/updateDragger2'

export const circleDraggerCallback = e => {
  let [ xPrev, yPrev ] = [ e.clientX, e.clientY ];

  const mousemove = e => {

    e.preventDefault();

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



    // const x = circleDragger.x + tangent[0]*scale;
    // const y = circleDragger.y + tangent[1]*scale;
    setDraggerPosition({x, y});



    xPrev = e.clientX;
    yPrev = e.clientY;


    document.addEventListener('mouseup', ()=>{
      document.removeEventListener('mousemove', mousemove)
    },{once: true})


  }

  document.addEventListener('mousemove', mousemove)
}

export const setDraggerPosition = ({ x, y }) => {
  const left = (x + spectrumContainer.width/2) - circleDragger.diameter/2;
  const top = (spectrumContainer.width/2 - y) - circleDragger.diameter/2;

  let progress;
  if (x < 0){
    progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3;
  } else {
    progress = (Math.atan(y/x) / Math.PI * 2 + 1)/2 * 3 + 3;
  }


  circleDragger.x = x;
  circleDragger.y = y;
  circleDragger.style.left = left + 'px';
  circleDragger.style.top = top + 'px';

  updateCanvas(calcColor(progress));
  updateDragger2();
  updateSwatch();
}
