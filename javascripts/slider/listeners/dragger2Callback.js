import { applyUpdates } from '../applyUpdates';

export const dragger2Callback = e => {

  e.preventDefault();
  let xPrev = e.clientX;
  let yPrev = e.clientY;

  pip.style.width = '35px';
  pip.style.height = '35px';

  document.body.classList.add('grabbing');
  // pip.classList.remove('animate');  //TODO animate

  const mousemove = e => {
    const diffx = e.clientX - xPrev;
    const diffy = e.clientY - yPrev;
    const newx = dragger2.x + diffx;
    const newy = dragger2.y + diffy;



    let x, y;

    if (-canvas.innerHeight*(2*newx/canvas.innerWidth - 1) > newy){
      if (Math.abs(diffy/diffx) > Math.sqrt(3)){
        y = newy;
        x = canvas.innerWidth/2 * (1 - newy/canvas.innerHeight)
      }else{
        x = newx;
        y = -canvas.innerHeight*(2*newx/canvas.innerWidth - 1);
      }
    }else if(canvas.innerHeight*(2*newx/canvas.innerWidth - 1) > newy){
      if (Math.abs(diffy/diffx) > Math.sqrt(3)){
        y = newy;
        x = canvas.innerWidth/2 * (newy/canvas.innerHeight + 1)
      }else{
        x = newx;
        y = canvas.innerHeight*(2*newx/canvas.innerWidth - 1);
      }
    }else{
      x = newx;
      y = newy;
    }

    //edge case clearance

    if (y > canvas.innerHeight){
      y = canvas.innerHeight;
    }else if (y < 0){
      y = 0;
    }

    if (x > canvas.innerWidth){
      x = canvas.innerWidth;
    } else if (x < 0){
      x = 0;
    }

    if (newy < 0){
      y = 0;
      x = canvas.innerWidth/2;
    }

    xPrev = e.clientX;
    yPrev = e.clientY;

    const triangleDragger = {x,y};
    applyUpdates({triangleDragger})
  };

  document.addEventListener('mousemove', mousemove);

  document.addEventListener('mouseup',()=>{
      document.removeEventListener('mousemove', mousemove);
      document.body.classList.remove('grabbing');
      pip.style.width = pip.diameter + 'px';
      pip.style.height = pip.diameter + 'px';
    },{
      once:true
    }
  );

}
