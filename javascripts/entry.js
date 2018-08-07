let x, y, draggable;
const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];
import { addDiv } from './draggableDiv';









document.addEventListener('DOMContentLoaded',()=>{

  document.getElementById('add').addEventListener('mousedown', e => {
    e.preventDefault(); addDiv();
  })
});
