import { format, calcColor } from './utils';
import { updateCanvas } from './updaters/updateCanvas';
import { updateDragger2 } from './updaters/updateDragger2';
import { updateSwatch } from './updaters/updateSwatch';


export const applyUpdates = ({x, y, status}) => {

  if (typeof(status) !== 'undefined') {
    dragger.status = +status;
    dragger.style.background = format(calcColor(status));
    updateCanvas(calcColor(status));
    dragger.style.top = dragger.status - dragger.diameter/2 + 'px';
  }

  if (typeof(x) !== 'undefined') {
    dragger2.x = x;
    dragger2.style.left = dragger2.x - dragger2.diameter/2 + 'px';
  }

  if (typeof(y) !== 'undefined') {
    dragger2.y = y;
    dragger2.style.top = dragger2.y - dragger2.diameter/2 + 'px';
  }

  updateDragger2();
  updateSwatch();

}
