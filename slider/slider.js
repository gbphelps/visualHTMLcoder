

const calcColor = status => {
    const progress = status / 300 * 6;
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
  document.getElementById('dragger').style.background = format(color);

  const buffer = ctx.createImageData(width, height);


  for (let i=0; i<(height*width); i++) {
    const top = Math.floor(i / width);
    const left = Math.floor(i % width);

    const xp = left;
    const yp = height - top;


    // RADIAL COORDINATES
    let theta0 = Math.atan(yp/xp);
    const theta = (Math.PI/3 - theta0)/(Math.PI/3);
    //map radial coordinates [0, pi/3] -> [1, 0]

    let r = Math.sqrt(xp*xp + yp*yp)/300;
    r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2)
    //map pie wedge to equilateral triangle by flattening arc

    if (theta < 0 || theta > 1 || r > 1){
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

  //for anti-aliasing
  const g1 = ctx.createLinearGradient(0, 0, width/2, 0);
  g1.addColorStop(0, 'black');
  g1.addColorStop(1, format(color));

  const g2 = ctx.createLinearGradient(width/2, 0, width, 0);
  g2.addColorStop(0, format(color));
  g2.addColorStop(1, 'white');

  ctx.beginPath();
    ctx.moveTo(1, height -.5);
    ctx.lineTo(width/2 + .5, .5);
    ctx.strokeStyle = g1;
    ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
    ctx.moveTo(width/2 + .5, .5);
    ctx.lineTo(width, height -.5);
    ctx.strokeStyle = g2;
    ctx.stroke();
  ctx.closePath();

};




document.addEventListener('DOMContentLoaded',()=>{

  const picker = document.getElementById('picker');

  const canvas = document.createElement('CANVAS');
  canvas.id = 'canvas';
  canvas.height = Math.round(300*Math.sqrt(3)/2);
  canvas.width = 300;
  picker.append(canvas);

  const ctx = canvas.getContext('2d');

  const slider = document.createElement('DIV');
  slider.id = 'slider';
  slider.style.position = 'absolute';
  picker.append(slider);

  const dragger = document.createElement('DIV');
  dragger.id = 'dragger';
  dragger.style.left = -9 + 'px'; //TODO 1/2 dragger height
  dragger.style.position = 'absolute';
  dragger.status = 0;
  slider.append(dragger);

  const dragger2 = document.createElement('DIV');
  dragger2.id = 'dragger2';
  dragger2.style.left = canvas.width / 2 - 9 + 'px'; //TODO 1/2 dragger height;
  dragger2.style.top = -9 + 'px';
  dragger2.x = canvas.width / 2;
  dragger2.y = 0;
  picker.append(dragger2);


  updateCanvas(calcColor(0),ctx);


  dragger2.addEventListener('mousedown', e => {
    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;

    const mousemove = e => {
      const diffx = e.clientX - x;
      const diffy = e.clientY - y;
      const newx = dragger2.x + diffx;
      const newy = dragger2.y + diffy;

      const box = canvas.getBoundingClientRect();

      if (e.clientX > box.right){
        dragger2.x = canvas.width;
      }else if (e.clientX < box.left){
        dragger2.x = 0;
      }

      if (e.clientY > box.bottom){
        dragger2.y = canvas.height;
      }else if (e.clientY < box.right){
        dragger2.y = 0;
      }

      if (-canvas.height*(2*newx/canvas.width - 1) > newy){
        dragger2.x = newx;
        dragger2.y = -canvas.height*(2*newx/canvas.width - 1);
      }else if(canvas.height*(2*newx/canvas.width - 1) > newy){
        dragger2.x = newx;
        dragger2.y = canvas.height*(2*newx/canvas.width - 1);
      }else{
        dragger2.x = newx;
        dragger2.y = newy;
      }

      if (dragger2.y > canvas.height){
        dragger2.y = canvas.height;
      }

      if (dragger2.x > canvas.width){
        dragger2.x = canvas.width;
      } else if (dragger2.x < 0){
        dragger2.x = 0;
      }

      x = e.clientX;
      y = e.clientY;


      //TODO just recalculate color - there are too many broken points
      const color = ctx.getImageData(dragger2.x, dragger2.y, 1, 1).data;
      dragger2.style.background = format(color);
      if (dragger2.y === canvas.height){
        const sat = (dragger2.x / canvas.width)*255;
        dragger2.style.background = `rgba(${sat},${sat},${sat},255)`;
      }



      dragger2.style.left = dragger2.x - 9 + 'px';
      dragger2.style.top = dragger2.y - 9 + 'px';



    };

    document.addEventListener('mousemove', mousemove);

    document.addEventListener('mouseup',
      ()=>document.removeEventListener('mousemove', mousemove),
      {once:true}
    );

  });

  dragger.addEventListener('mousedown', e => {
    let x = e.clientX;

    const mousemove = e => {
      const diff = e.clientX - x;
      const newValue = dragger.status + diff;
      if (newValue > 300){
        x = slider.getBoundingClientRect().right;
        dragger.status = 300;
      } else if (newValue < 0) {
        x = slider.getBoundingClientRect().left;
        dragger.status = 0;
      } else {
        x = e.clientX;
        dragger.status = newValue;
      }
      dragger.style.left = dragger.status - 9 + 'px'; //TODO 1/2 dragger height

      const colorArr = calcColor(dragger.status);
      updateCanvas(colorArr, ctx);

    };

    const mouseup = e => {
      document.removeEventListener('mousemove', mousemove);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup, {once: true});

  });

});
