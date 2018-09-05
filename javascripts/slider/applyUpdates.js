import { format, calcColor,revCalc } from './utils';
import { updateCanvas } from './updaters/updateCanvas';
import { updateDragger2 } from './updaters/updateDragger2';
import { updateSwatch } from './updaters/updateSwatch';
import { setDraggerPosition } from './listeners/circleDraggerCallback'


export const applyUpdates = ({triangleDragger, progress, colorTrio}) => {

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


  if (typeof(colorTrio) !== 'undefined') {

    let color = Object.keys(colorTrio)[0];

    if (color === 'red'){
      redDragger.status = colorTrio.red;
      redDragger.style.left = redDragger.status - redDragger.diameter/2 + 'px';
    } else if (color === 'green') {
      greenDragger.status = colorTrio.green;
      greenDragger.style.left = greenDragger.status - greenDragger.diameter/2 + 'px';
    } else if (color === 'blue') {
      blueDragger.status = colorTrio.blue;
      blueDragger.style.left = blueDragger.status - blueDragger.diameter/2 + 'px';
    }




  }

  updateDragger2();
  updateSwatch();

}
