import { format } from '../utils'

export const updateSwatch = () => {
  const swatch = document.getElementById('swatch');
  swatch.style.background = format(dragger2.color);
  const [R,G,B] = dragger2.color;
  const sat =
    .2126 * R +
    .7152 * G +
    .0722 * B ;
    console.log(sat);
  swatch.style.color = (sat < 255/2 ? 'white' : 'black');
   dragger2.color.forEach((hue,i)=>{
     const input = document.getElementById(`color-${i}`);
     input.value = hue;
   });
};
