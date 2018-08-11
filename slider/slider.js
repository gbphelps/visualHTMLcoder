

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



const updateCanvas = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  document.getElementById('dragger').style.background = format(canvas.color);

  const buffer = ctx.createImageData(canvas.width, canvas.height);


  for (let i=0; i<(canvas.height* canvas.width); i++) {
    const top = Math.floor(i / canvas.width);
    const left = Math.floor(i % canvas.width);

    const xp = left;
    const yp = canvas.height - top;


    // RADIAL COORDINATES
    let theta0 = Math.atan(yp/xp);
    const theta = (Math.PI/3 - theta0)/(Math.PI/3);
    //map radial coordinates [0, pi/3] -> [1, 0]

    let r = Math.sqrt(xp*xp + yp*yp)/300;
    r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2)
    //map pie wedge to equilateral triangle by flattening arc

    if (theta < 0 || theta > 1 || r > 1){
    }else{
      buffer.data[i*4 + 0] = (canvas.color[0] + (255-canvas.color[0])*theta) * r;
      buffer.data[i*4 + 1] = (canvas.color[1] + (255-canvas.color[1])*theta) * r;
      buffer.data[i*4 + 2] = (canvas.color[2] + (255-canvas.color[2])*theta) * r;
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
  const g1 = ctx.createLinearGradient(0, 0, canvas.width/2, 0);
  g1.addColorStop(0, 'black');
  g1.addColorStop(1, format(canvas.color));

  const g2 = ctx.createLinearGradient(canvas.width/2, 0, canvas.width, 0);
  g2.addColorStop(0, format(canvas.color));
  g2.addColorStop(1, 'white');

  ctx.beginPath();
    ctx.moveTo(1, canvas.height -.5);
    ctx.lineTo(canvas.width/2 + .5, .5);
    ctx.strokeStyle = g1;
    ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
    ctx.moveTo(canvas.width/2 + .5, .5);
    ctx.lineTo(canvas.width, canvas.height -.5);
    ctx.strokeStyle = g2;
    ctx.stroke();
  ctx.closePath();

};




const updateDragger2 = () => {
  const dragger2 = document.getElementById('dragger2');
  const canvas = document.getElementById('canvas');

    const xp = dragger2.x;
    const yp = canvas.height - dragger2.y;

    let theta0 = Math.atan(yp/xp);
    const theta = (Math.PI/3 - theta0)/(Math.PI/3);

    let r = Math.sqrt(xp*xp + yp*yp)/300;
    r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2);


    let R = Math.round((canvas.color[0] + (255-canvas.color[0])*theta) * r) || 0;
    let G = Math.round((canvas.color[1] + (255-canvas.color[1])*theta) * r) || 0;
    let B = Math.round((canvas.color[2] + (255-canvas.color[2])*theta) * r) || 0;
    let A = 255;

    dragger2.color = [R,G,B,A]
    dragger2.style.background = format([R,G,B,A]);
}


const updateSwatch = () => {
  const swatch = document.getElementById('swatch');
  swatch.style.background = format(dragger2.color);
  swatch.innerHTML = format(dragger2.color);
};

const create = (tag, parent, props, style) => {
  const element = document.createElement(tag);
  Object.assign(element, props);
  parent.append(element);
  if (style) Object.assign(element.style, style);
  return element;
};


document.addEventListener('DOMContentLoaded',()=>{

  const picker = document.getElementById('picker');

  const canvas = create('CANVAS', picker, {
    id: 'canvas',
    height: Math.round(300*Math.sqrt(3)/2),
    width: 300,
    color: [255, 0, 0, 255],
  });

  const ctx = canvas.getContext('2d');

  const slider =
    create('DIV', picker, {
      id: 'slider'
    },{
      position: 'relative'
    });

  const dragger =
    create('DIV', slider, {
      id: 'dragger',
      status: 0,
    },{
      left: -9 + 'px',
      position: 'absolute',
    });

  const dragger2 =
    create('DIV', picker, {
      id: 'dragger2',
      x: canvas.width/2,
      y: 0,
    },{
      left: canvas.width/2 - 9 + 'px',
      top: -9 + 'px'
    });

  const swatch =
    create('DIV', picker,{
      id: 'swatch',
      innerHTML: format(canvas.color),
    },{
      background: format(canvas.color),
    });


  updateDragger2();
  updateCanvas();


  dragger2.addEventListener('mousedown', e => {

    //TODO make it easier to get the top shade
    //TODO consider adding a feature where it determines
    //which cardinal direction is closet to the user's choice

    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;

    const mousemove = e => {
      const diffx = e.clientX - x;
      const diffy = e.clientY - y;
      const newx = dragger2.x + diffx;
      const newy = dragger2.y + diffy;

      const box = canvas.getBoundingClientRect();



      if (-canvas.height*(2*newx/canvas.width - 1) > newy){
        if (Math.abs(diffy/diffx) > Math.sqrt(3)){
          dragger2.y = newy;
          dragger2.x =  canvas.width/2 * (1 - newy/canvas.height)
        }else{
          dragger2.x = newx;
          dragger2.y = -canvas.height*(2*newx/canvas.width - 1);
        }
      }else if(canvas.height*(2*newx/canvas.width - 1) > newy){
        if (Math.abs(diffy/diffx) > Math.sqrt(3)){
          dragger2.y = newy;
          dragger2.x = canvas.width/2 * (newy/canvas.height + 1)
        }else{
          dragger2.x = newx;
          dragger2.y = canvas.height*(2*newx/canvas.width - 1);
        }
      }else{
        dragger2.x = newx;
        dragger2.y = newy;
      }

      //edge case clearance
      
      if (dragger2.y > canvas.height){
        dragger2.y = canvas.height;
      }else if (dragger2.y < 0){
        dragger2.y = 0;
      }

      if (dragger2.x > canvas.width){
        dragger2.x = canvas.width;
      } else if (dragger2.x < 0){
        dragger2.x = 0;
      }

      if (newy < 0){
        dragger2.y = 0;
        dragger2.x = canvas.width/2;
      }

      x = e.clientX;
      y = e.clientY;


      dragger2.style.left = dragger2.x - 9 + 'px';
      dragger2.style.top = dragger2.y - 9 + 'px';
      updateDragger2();
      updateSwatch();





    };

    document.addEventListener('mousemove', mousemove);

    document.addEventListener('mouseup',
      ()=>document.removeEventListener('mousemove', mousemove),
      {once:true}
    );

  });

  dragger.addEventListener('mousedown', e => {
    e.preventDefault();
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
      canvas.color = colorArr;

      updateCanvas();
      updateDragger2();
      updateSwatch();

    };

    const mouseup = e => {
      document.removeEventListener('mousemove', mousemove);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup, {once: true});

  });

});
