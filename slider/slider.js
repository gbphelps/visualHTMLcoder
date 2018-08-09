


class Color{
  constructor(red,green,blue,opacity){
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;
  }
  print(){
    return `rgba(${this.red},${this.green},${this.blue},${this.opacity})`
  }
}

class Gradient{

  constructor(max=255, min=0, hue=0){
    this.max = max;
    this.min = min;
    this.hue = hue;
  }

  color(){
    let progress = this.hue / 290 * 6;
    let inc = (this.max - this.min) * (progress - Math.floor(progress));

    switch (Math.floor(progress)){
      case 0:
        return [255, 0+inc, 0, 1]
      case 1:
        return [255-inc, 255, 0, 1]
      case 2:
        return [0, 255, 0+inc, 1]
      case 3:
        return [0, 255-inc, 255, 1]
      case 4:
        return [0+inc, 0, 255, 1]
      case 5:
        return [255, 0, 255-inc, 1]
      case 6:
        return [255, 0, 0, 1]
    }
  }

};

const format = color => `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;

document.addEventListener('DOMContentLoaded',()=>{
  const ctx = document.getElementById('canvas').getContext('2d');


  const slider = document.createElement('DIV');
  slider.id = 'slider';
  slider.style.position = 'absolute';
  document.body.append(slider);

  const dragger = document.createElement('DIV');
  dragger.id = 'dragger';
  dragger.style.left = '0px';
  dragger.style.position = 'absolute';
  slider.append(dragger);

  dragger.gradient = new Gradient();

  dragger.addEventListener('mousedown', e => {
    let x = e.clientX;

    const mousemove = e => {
      const diff = e.clientX - x;
      const newValue = dragger.gradient.hue + diff;
      if (newValue > 290){
        x = slider.getBoundingClientRect().right - 10;
        dragger.gradient.hue = 290;
      } else if (newValue < 0) {
        x = slider.getBoundingClientRect().left +10;
        dragger.gradient.hue = 0;
      } else {
        x = e.clientX;
        dragger.gradient.hue = newValue;
      }
      dragger.style.left = dragger.gradient.hue + 'px';

      dragger.style.background = format(dragger.gradient.color());



      const buffer = ctx.createImageData(100,100);
      const gradient = new Gradient(dragger.gradient.max, dragger.gradient.min, dragger.gradient.hue);

      for (let i=0; i<(100*100); i++) {
        const top = Math.floor(i/100);
        const left = Math.floor(i%100);

        const b = top/100;
        const a = left/100;

        const rgb = gradient.color();
        buffer.data[i*4 + 0] = (rgb[0] + (255-rgb[0])*a) *b;
        buffer.data[i*4 + 1] = (rgb[1] + (255-rgb[1])*a) *b;
        buffer.data[i*4 + 2] = (rgb[2] + (255-rgb[2])*a) *b;
        buffer.data[i*4 + 3] = 255;
      }
      console.log(buffer.data);

      ctx.putImageData(buffer, 0, 0);

    };

    const mouseup = e => {
      console.log('firing');
      document.removeEventListener('mousemove', mousemove);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup, {once: true});

  });

});
