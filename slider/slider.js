


const grab = 'url(https://ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur), default';
const grabbing = 'url(https://ssl.gstatic.com/ui/v1/icons/mail/images/2/closedhand.cur), default';

const calcColor = status => {
    const progress = status / 260 * 6;
    let inc = 255 * (progress - Math.floor(progress));

    switch (Math.floor(progress)){
      case 0:
        return [255, inc, 0]
      case 1:
        return [255-inc, 255, 0]
      case 2:
        return [0, 255, inc]
      case 3:
        return [0, 255-inc, 255]
      case 4:
        return [inc, 0, 255]
      case 5:
        return [255, 0, 255-inc]
      case 6:
        return [255, 0, 0]
    }
}

const revCalc = color => {
  let progress;

  if (color[0] === 255 && color[2] === 0){
    progress = 0 + color[1]/255;
  }else if (color[1] === 255 && color[2] === 0){
    progress = 1 + 1 - color[0]/255;
  }else if (color[1] === 255 && color[0] === 0){
    progress = 2 + color[2]/255;
  }else if (color[2] === 255 && color[0] === 0){
    progress = 3 + 1 - color[1]/255;
  }else if (color[2] === 255 && color[1] === 0){
    progress = 4 + color[0]/255;
  }else if (color[0] === 255 && color[1] === 0){
    progress = 5 + 1 - color[2]/255;
  }

  const status = progress * 260/6;
  const dragger = document.getElementById('dragger');
  dragger.status = status;
  dragger.style.top = status - 16 + 'px';
}



const format = color => `rgb(${color[0]},${color[1]},${color[2]})`;


//TODO TODO TODO
const colorToCoord = color => {
  const [min,mid,max] = Array.from(color).sort((x,y)=> x-y);
  const r = max / 255;
  const theta = min / max;
  const missingColor = 255 * (mid - min) / (max - min);

  let parentColor = [];
  color.forEach(hue =>{
    switch (hue){
      case max: parentColor.push(255); break;
      case min: parentColor.push(0); break;
      default: parentColor.push(missingColor); break;
    }
  });

  const dragger = document.getElementById('dragger');
  const dragger2 = document.getElementById('dragger2');

  const theta0 = Math.PI/3 - (Math.PI/3 * theta);
  dragger2.x = Math.sqrt(3) * max * 300 /2 /255 /Math.cos(Math.PI/6-theta0) /Math.sqrt(1+ Math.tan(theta0) * Math.tan(theta0));
  dragger2.y = canvas.height - dragger2.x * Math.tan(theta0);

  dragger2.style.left = dragger2.x - 15 + 'px';
  dragger2.style.top = dragger2.y - 15 + 'px';
  dragger2.color = color;
  dragger2.style.background = format(color);
  dragger.style.borderRightColor = format(color);
  canvas.color = parentColor;
  updateCanvas();
  revCalc(parentColor);
  updateSwatch();


};




const updateCanvas = () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

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

const updateDragger = () => {
  dragger.style.borderRightColor = format(document.getElementById('dragger2').color);
}

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

    dragger2.color = [R,G,B];
    dragger2.style.background = format([R,G,B]);
}


const updateSwatch = () => {
  const swatch = document.getElementById('swatch');
  swatch.style.background = format(dragger2.color);
  const sat = dragger2.color.reduce((acc,el) => acc += el)-255;
  swatch.style.color = (sat < 255*3/2 ? 'white' : 'black');
  dragger2.color.forEach((hue,i)=>{
    document.getElementById(`color-${i}`).value = hue;
  });
};

const create = (tag, parent, props, style) => {
  const element = document.createElement(tag);
  Object.assign(element, props);
  parent.append(element);
  if (style) Object.assign(element.style, style);
  return element;
};

const updateSlider = () => {

const dragger2 = document.getElementById('dragger2');
// const canvas = document.getElementById('canvas');
//
//   const xp = dragger2.x;
//   const yp = canvas.height - dragger2.y;
//
//   let theta0 = Math.atan(yp/xp);
//   const theta = (Math.PI/3 - theta0)/(Math.PI/3);
//
//   let r = Math.sqrt(xp*xp + yp*yp)/300;
//   r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2);
//
//   let colors = [
//     [255, 0, 0],
//     [255, 255, 0],
//     [0, 255, 0],
//     [0, 255, 255],
//     [0, 0, 255],
//     [255, 0, 255],
//     [255, 0, 0]
//   ];
//
//   const colorStops = colors.map(color => {
//     const three = color.map(component => {
//       return Math.round((component + (255 - component)*theta) * r) || 0
//     });
//     return three.concat(255);
//   });
//
//   document.getElementById('slider').style.background =
//   `linear-gradient(
//         to bottom,
//         ${format(colorStops[0])},
//         ${format(colorStops[1])},
//         ${format(colorStops[2])},
//         ${format(colorStops[3])},
//         ${format(colorStops[4])},
//         ${format(colorStops[5])},
//         ${format(colorStops[6])}
//     )`;

  updateDragger();

}


document.addEventListener('DOMContentLoaded',()=>{
  document.body.style.cursor = 'default';
  const container = create('DIV',document.body,{id: 'container'},{display: 'flex'});
  const picker = create('DIV', container, {id:'picker'});




  const canvas = create('CANVAS', picker, {
    id: 'canvas',
    height: Math.round(300*Math.sqrt(3)/2),
    width: 300,
    color: [255, 0, 0, 255],
  });

  const slider =
    create('DIV', container, {
      id: 'slider'
    },{
      position: 'relative'
    });


  const ctx = canvas.getContext('2d');

  const dragger2 =
    create('DIV', picker, {
      id: 'dragger2',
      color: canvas.color,
      x: canvas.width/2,
      y: 0,
    },{
      left: canvas.width/2 - 15 + 'px',
      top: -15 + 'px'
    });

    const dragger =
      create('DIV', slider, {
        id: 'dragger',
        status: 0,
      },{
        top: -16 + 'px',
        position: 'absolute',
        'border-right-color': format(canvas.color)
      });


  const swatch =
    create('DIV', container, {
      id: 'swatch'
    },{
      background: format(canvas.color)
    });

    const red = document.createElement('INPUT');
    red.id = 'color-0';
    const green = document.createElement('INPUT');
    green.id = 'color-1';
    const blue = document.createElement('INPUT');
    blue.id = 'color-2';
    [red,green,blue].forEach(input => input.setAttribute('size', 3))

    create('SPAN', swatch, {innerHTML: 'rgb('});
    swatch.append(red);
    create('SPAN', swatch, {innerHTML: ','});
    swatch.append(green);
    create('SPAN', swatch, {innerHTML: ','});
    swatch.append(blue);
    create('SPAN', swatch, {innerHTML: ')'});




  updateDragger2();
  updateCanvas();


  // //GRABBING
  // dragger2.addEventListener('mouseover', ()=>{
  //   if (document.body.style.cursor === 'default') document.body.style.cursor = grab;
  //   dragger2.addEventListener('mouseout',()=>{
  //     if (document.body.style.cursor === 'grab') document.body.style.cursor = 'default';
  //   },{once:true})
  // })

  dragger2.addEventListener('mousedown', e => {

    //TODO make it easier to get the top shade
    //TODO consider adding a feature where it determines
    //which cardinal direction is closet to the user's choice

    e.preventDefault();
    let x = e.clientX;
    let y = e.clientY;
    //document.body.style.cursor = grabbing;

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


      dragger2.style.left = dragger2.x - 15 + 'px';
      dragger2.style.top = dragger2.y - 15 + 'px';
      updateDragger2();
      updateSwatch();
      updateSlider();

    };

    document.addEventListener('mousemove', mousemove);

    document.addEventListener('mouseup',
      ()=>{
        document.removeEventListener('mousemove', mousemove);
      },
      {once:true}
    );

  });

  dragger.addEventListener('mousedown', e => {
    e.preventDefault();
    let y = e.clientY;

    const mousemove = e => {

      const diff = e.clientY - y;
      const newValue = dragger.status + diff;

      if (newValue > 260){
        dragger.status = 260;
      } else if (newValue < 0) {
        dragger.status = 0;
      } else {
        dragger.status = newValue;
        y = e.clientY;
      }

      dragger.style.top = dragger.status - 16 + 'px'; //TODO 1/2 dragger height

      canvas.color = calcColor(dragger.status);

      updateCanvas();
      updateDragger2();
      updateDragger();
      updateSwatch();

    };

    const mouseup = e => {
      document.removeEventListener('mousemove', mousemove);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup, {once: true});

  });

});
