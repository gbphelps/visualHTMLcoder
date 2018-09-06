import { applyUpdates } from '../applyUpdates';
import { generateColor } from '../utils'

export const updateTrioDraggers = (colorTrio) => {
  const status = {
    red: redDragger.status,
    green: greenDragger.status,
    blue: blueDragger.status
  };

  Object.assign(status, colorTrio);

    redDragger.status = status.red;
    redDragger.style.left = redDragger.status - redDragger.diameter/2 + 'px';
    redProgress.style.width = redDragger.status + 'px';

    greenDragger.status = status.green;
    greenDragger.style.left = greenDragger.status - greenDragger.diameter/2 + 'px';
    greenProgress.style.width = greenDragger.status + 'px';

    blueDragger.status = status.blue;
    blueDragger.style.left = blueDragger.status - blueDragger.diameter/2 + 'px';
    blueProgress.style.width = blueDragger.status + 'px';
}
