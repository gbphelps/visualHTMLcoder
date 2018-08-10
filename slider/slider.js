

const calcColor = status => {
    const progress = status / 290 * 6;
    let inc = 255 * (progress - Math.floor(progress));

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

const format = color => `rgba(${color[0]},${color[1]},${color[2]},${color[3]})`;



const updateCanvas = (color, ctx) => {
  let height = document.getElementById('canvas').height;
  let width = document.getElementById('canvas').width;

  const buffer = ctx.createImageData(width, height);


  for (let i=0; i<(height*width); i++) {
    const top = Math.floor(i / width);
    const left = Math.floor(i % width);

    const xp = left;
    const yp = height - top;


    // RADIAL COORDINATES
    let theta0 = Math.atan(yp/xp);
    theta0 = (theta0 < 0 ? Math.PI + theta0 : theta0);
    const theta = (Math.PI/3 - theta0)/(Math.PI/3);

    let r = Math.sqrt(xp*xp + yp*yp)/200;
    r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2)

    if (theta < 0 || theta > 1 || r>1){
      buffer.data[i*4 + 0] = 255;
      buffer.data[i*4 + 1] = 255;
      buffer.data[i*4 + 2] = 255;
      buffer.data[i*4 + 3] = 255;
    }else{
      buffer.data[i*4 + 0] = (color[0] + (255-color[0])*theta) * r;
      buffer.data[i*4 + 1] = (color[1] + (255-color[1])*theta) * r;
      buffer.data[i*4 + 2] = (color[2] + (255-color[2])*theta) * r;
      buffer.data[i*4 + 3] = 255;
    }



    // //RECTANGULAR COORDINATES
    // const b = top/height;
    // const a = left/width;
    // buffer.data[i*4 + 0] = (color[0] + (255-color[0])*b) * (a);
    // buffer.data[i*4 + 1] = (color[1] + (255-color[1])*b) * (a);
    // buffer.data[i*4 + 2] = (color[2] + (255-color[2])*b) * (a);
    // buffer.data[i*4 + 3] = 255;
  }

  ctx.putImageData(buffer, 0, 0);
};




document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('canvas').height = 200;
  document.getElementById('canvas').width = 300;
  const ctx = document.getElementById('canvas').getContext('2d');
  updateCanvas(calcColor(0),ctx);


  const slider = document.createElement('DIV');
  slider.id = 'slider';
  slider.style.position = 'absolute';
  document.body.append(slider);

  const dragger = document.createElement('DIV');
  dragger.id = 'dragger';
  dragger.style.left = '0px';
  dragger.style.position = 'absolute';
  slider.append(dragger);

  dragger.status = 0;

  dragger.addEventListener('mousedown', e => {
    let x = e.clientX;

    const mousemove = e => {
      const diff = e.clientX - x;
      const newValue = dragger.status + diff;
      if (newValue > 290){
        x = slider.getBoundingClientRect().right - 10;
        dragger.status = 290;
      } else if (newValue < 0) {
        x = slider.getBoundingClientRect().left +10;
        dragger.status = 0;
      } else {
        x = e.clientX;
        dragger.status = newValue;
      }
      dragger.style.left = dragger.status + 'px';

      const colorArr = calcColor(dragger.status);
      dragger.style.background = format(colorArr);

      updateCanvas(colorArr, ctx);

    };

    const mouseup = e => {
      console.log('firing');
      document.removeEventListener('mousemove', mousemove);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup, {once: true});

  });

});
