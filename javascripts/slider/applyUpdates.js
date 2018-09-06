import { format, calcColor,revCalc, generateColor } from './utils';
import { updateCanvas } from './updaters/updateCanvas';
import { updateDragger2 } from './updaters/updateDragger2';
import { updateSwatch } from './updaters/updateSwatch';
import { setDraggerPosition } from './listeners/circleDraggerCallback';
import { updateTrioDraggers } from './updaters/updateTrioDraggers';


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
    const status = {
      red: redDragger.status,
      green: greenDragger.status,
      blue: blueDragger.status
    };

    Object.assign(status, colorTrio);
    const color = [status.red*255/200, status.green*255/200, status.blue*255/200];

    let progress, triangleDragger;
    ({progress, triangleDragger} = generateColor(color));
    const radius = (spectrumContainer.width/2 - circleSlider.thickness)/2 + spectrumContainer.width/4;
    const x = Math.cos(progress + Math.PI/2) * radius;
    const y = Math.sin(progress + Math.PI/2) * radius;
    setDraggerPosition({x, y});
    dragger2.x = triangleDragger.x;
    dragger2.style.left = dragger2.x - dragger2.diameter/2 + 'px';
    dragger2.y = triangleDragger.y;
    dragger2.style.top = dragger2.y - dragger2.diameter/2 + 'px';

  }

updateDragger2();
updateSwatch();
updateTrioDraggers({
  red: dragger2.color[0]/255*200,
  green: dragger2.color[1]/255*200,
  blue: dragger2.color[2]/255*200
});

}
