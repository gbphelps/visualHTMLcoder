import { format } from '../utils'

export const updateSwatch = () => {
  const swatch = document.getElementById('swatch');
  swatch.style.background = format(dragger2.color);
  const sat = dragger2.color.reduce((acc,el) => acc += el)-255;
  swatch.style.color = (sat < 255*3/2 ? 'white' : 'black');
   dragger2.color.forEach((hue,i)=>{
     const input = document.getElementById(`color-${i}`);
     input.value = hue;
   });
};
