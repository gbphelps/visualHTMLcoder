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
      pip: redPip,
      key: 'red'
    },
    green: {
      slider: greenSlider,
      dragger: greenDragger,
      pip: greenPip,
      key: 'green'
    },
    blue: {
      slider: blueSlider,
      dragger: blueDragger,
      pip: bluePip,
      key: 'blue',
    }
  }

  data[color].pip.style.height = '35px';
  data[color].pip.style.width = '35px';
  data[color].pip.style['box-shadow'] = '0 8px 8px 0 rgba(0,0,0,.4)';
  document.body.classList.add('grabbing')

  const mousemove = e => {

    const colorTrio = {};

    const diff = e.clientX - x;
    const newValue = data[color].dragger.status + diff;

    if (newValue > 200){ //TODO these will all be the same, factor out
      colorTrio[data[color].key] = 200;
    } else if (newValue < 0) {
      colorTrio[data[color].key] = 0;
    } else {
      colorTrio[data[color].key] = newValue;
      x = e.clientX;
    }

    applyUpdates({colorTrio})

  };

  const mouseup = e => {
    document.removeEventListener('mousemove', mousemove);
    data[color].pip.style.height = '20px';
    data[color].pip.style.width = '20px';
    data[color].pip.style['box-shadow'] = '0 2px 2px 0 rgba(0,0,0,.4)';
    document.body.classList.remove('grabbing')

  };

  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mouseup', mouseup, {once: true});

}
