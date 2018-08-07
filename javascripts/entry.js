let x, y, draggable;
const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];
import { addDiv } from './draggableDiv';

window.snap = false;







document.addEventListener('DOMContentLoaded',()=>{

  document.getElementById('add').addEventListener('mousedown', e => {
    e.preventDefault();
    addDiv();
  })

  document.getElementById('snap').addEventListener('mousedown', e => {
    e.preventDefault();
    window.snap = !window.snap;
    e.target.style.color = window.snap ? 'red' : 'black';
  })
});
