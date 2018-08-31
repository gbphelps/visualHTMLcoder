import { format, calcColor, revCalc, generateColor } from '../utils';
import { applyUpdates } from '../applyUpdates';

export const colorInputCallback = e => {
    const color = [];
    for (let i = 0; i < 3; i++) {
      const input = document.getElementById(`color-${i}`);
      let val = +input.value;
      if (input === e.target && !(val >= 0 && val <= 255)){
        input.value = input.last;
        return;
      };
      color.push(val);
      input.last = val;
    }
    applyUpdates(generateColor(color))
  };
