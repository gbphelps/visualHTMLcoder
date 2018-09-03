// import { applyUpdates } from '../applyUpdates'
//
//
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
