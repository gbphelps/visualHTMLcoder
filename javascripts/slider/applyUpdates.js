import { format, calcColor,revCalc } from './utils';
import { updateCanvas } from './updaters/updateCanvas';
import { updateDragger2 } from './updaters/updateDragger2';
import { updateSwatch } from './updaters/updateSwatch';
import { setDraggerPosition } from './listeners/circleDraggerCallback'


export const applyUpdates = ({triangleDragger, progress}) => {

  if (typeof(progress) !== 'undefined') {
    const radius = (spectrumContainer.width/2 - circleSlider.thickness)/2 + spectrumContainer.width/4;
    const x = Math.cos(progress + Math.PI/2) * radius;
    const y = Math.sin(progress + Math.PI/2) * radius;
    setDraggerPosition({x, y});



  }

  if (typeof(triangleDragger) !== 'undefined') {
    dragger2.x = triangleDragger.x;
    dragger2.style.left = dragger2.x - dragger2.diameter/2 + 'px';
    dragger2.y = triangleDragger.y;
    dragger2.style.top = dragger2.y - dragger2.diameter/2 + 'px';
  }

  updateDragger2();
  updateSwatch();

}
