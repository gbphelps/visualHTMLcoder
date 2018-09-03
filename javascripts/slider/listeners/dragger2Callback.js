import { applyUpdates } from '../applyUpdates';

export const dragger2Callback = e => {

  e.preventDefault();
  let xPrev = e.clientX;
  let yPrev = e.clientY;
  //document.body.style.cursor = grabbing;
  pip.style.width = '30px';
  pip.style.height = '30px';

  const mousemove = e => {
    const diffx = e.clientX - xPrev;
    const diffy = e.clientY - yPrev;
    const newx = dragger2.x + diffx;
    const newy = dragger2.y + diffy;

    const box = canvas.getBoundingClientRect();



    let x, y;

    if (-canvas.height*(2*newx/canvas.width - 1) > newy){
      if (Math.abs(diffy/diffx) > Math.sqrt(3)){
        y = newy;
        x = canvas.width/2 * (1 - newy/canvas.height)
      }else{
        x = newx;
        y = -canvas.height*(2*newx/canvas.width - 1);
      }
    }else if(canvas.height*(2*newx/canvas.width - 1) > newy){
      if (Math.abs(diffy/diffx) > Math.sqrt(3)){
        y = newy;
        x = canvas.width/2 * (newy/canvas.height + 1)
      }else{
        x = newx;
        y = canvas.height*(2*newx/canvas.width - 1);
      }
    }else{
      x = newx;
      y = newy;
    }

    //edge case clearance

    if (y > canvas.height){
      y = canvas.height;
    }else if (y < 0){
      y = 0;
    }

    if (x > canvas.width){
      x = canvas.width;
    } else if (x < 0){
      x = 0;
    }

    if (newy < 0){
      y = 0;
      x = canvas.width/2;
    }

    xPrev = e.clientX;
    yPrev = e.clientY;

    const triangleDragger = {x,y};
    applyUpdates({triangleDragger})
  };

  document.addEventListener('mousemove', mousemove);

  document.addEventListener('mouseup',()=>{
      document.removeEventListener('mousemove', mousemove);
      pip.style.width = '10px';
      pip.style.height = '10px';
    },{
      once:true
    }
  );

}
