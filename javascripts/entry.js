let x, y, draggable;
const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];
import { addDiv } from './draggableDiv';








const mouseup = () => {
  document.removeEventListener('mousemove', window.dragListener);
  wholeDoc.style.cursor = 'auto';
};


document.addEventListener('DOMContentLoaded',()=>{
  document.addEventListener('mouseup',mouseup);

  document.getElementById('add').addEventListener('mousedown', e => {
    e.preventDefault(); addDiv();
    
  })
});
