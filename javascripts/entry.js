let x, y, draggable;
const wholeDoc = Array.from(document.getElementsByTagName('html'))[0];
import { addDiv, v } from './draggableDiv';


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

    if (window.snap){
      if (confirm('Snap existing elements?')){
        Array.from(document.getElementsByClassName('draggable')).forEach(el=>{
          console.log(el);
          el.style.top = Math.round(v(el.style.top)/20)*20 + 'px';
          el.style.left = Math.round(v(el.style.left)/20)*20 + 'px';
          el.style.height = Math.round(v(el.style.height)/20)*20 + 'px';
          el.style.width = Math.round(v(el.style.width)/20)*20 + 'px';
        })
      }
    }

  })
});
