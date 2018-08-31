import { slider } from './slider/slider'






// let x, y, draggable;
// const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];
// import { addDiv, v } from './draggableDiv';
//
//
// window.snap = false;
// window.addDiv = false;
//
//
//
//
//
//
//
// document.addEventListener('DOMContentLoaded',()=>{
//
//   document.getElementById('add').addEventListener('click', e => {
//     addDiv();
//   })
//
//   document.getElementById('snap').addEventListener('click', e => {
//     e.preventDefault();
//     window.snap = !window.snap;
//     document.getElementById('snap').classList.toggle('active')
//
//     if (window.snap){
//       if (confirm('Snap existing elements?')){
//         Array.from(document.getElementsByClassName('draggable')).forEach(el=>{
//
//           ///////delete
//           el.style.transitionDuration = '.5s';
//           setTimeout(() =>{el.style.transitionDuration = '0s'}, 501)
//           ///////
//
//           //////remove from setTimeout
//           setTimeout(()=>{
//             el.style.top = Math.round(v(el.style.top)/20)*20 + 'px';
//             el.style.left = Math.round(v(el.style.left)/20)*20 + 'px';
//             el.style.height = Math.round(v(el.style.height)/20)*20 + 'px';
//             el.style.width = Math.round(v(el.style.width)/20)*20 + 'px';
//           }, 1); //TODO how can this be done with a promise??
//
//
//
//
//         })
//       }
//     }
//
//   })
// });
