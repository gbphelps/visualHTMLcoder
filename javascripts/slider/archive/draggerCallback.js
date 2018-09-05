import { applyUpdates } from '../applyUpdates'


// export const draggerCallback = e => {
//   e.preventDefault();
//   let y = e.clientY;
//
//   const mousemove = e => {
//
//     const diff = e.clientY - y;
//     const newValue = dragger.status + diff;
//
//     if (newValue > slider.height){
//       status = slider.height;
//     } else if (newValue < 0) {
//       status = 0;
//     } else {
//       status = newValue;
//       y = e.clientY;
//     }
//
//     applyUpdates({status});
//   };
//
//   const mouseup = e => {
//     document.removeEventListener('mousemove', mousemove);
//   };
//
//   document.addEventListener('mousemove', mousemove);
//   document.addEventListener('mouseup', mouseup, {once: true});
//
// }



export const draggerCallback = color => e => {
  e.preventDefault();
  let x = e.clientX;

  const data = {
    red: {
      slider: redSlider,
      dragger: redDragger,
      key: 'red'
    },
    green: {
      slider: greenSlider,
      dragger: greenDragger,
      key: 'green'
    },
    blue: {
      slider: blueSlider,
      dragger: blueDragger,
      key: 'blue'
    }
  }

  const mousemove = e => {

    const colorTrio = {};

    const diff = e.clientX - x;
    const newValue = data[color].dragger.status + diff;

    if (newValue > data[color].slider.width){ //TODO these will all be the same, factor out
      colorTrio[data[color].key] = data[color].slider.width;
    } else if (newValue < 0) {
      colorTrio[data[color].key] = 0;
    } else {
      colorTrio[data[color].key] = newValue;
      x = e.clientX;
    }

    applyUpdates({colorTrio});
  };

  const mouseup = e => {
    document.removeEventListener('mousemove', mousemove);
  };

  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup, {once: true});

}
