
document.addEventListener('DOMContentLoaded',()=>{
  const slider = document.createElement('DIV');
  slider.id = 'slider';
  slider.style.position = 'absolute';
  document.body.append(slider);

  const dragger = document.createElement('DIV');
  dragger.id = 'dragger';
  dragger.style.left = '0px';
  dragger.style.position = 'absolute';
  slider.append(dragger);
  dragger.state = 0;

  dragger.addEventListener('mousedown', e => {
    let x = e.clientX;

    const mousemove = e => {
      const diff = e.clientX - x;
      const newValue = dragger.state + diff;
      if (newValue > 290){
        x = slider.getBoundingClientRect().right;
        dragger.state = 290;
      } else if (newValue < 0) {
        x = slider.getBoundingClientRect().left;
        dragger.state = 0;
      } else {
        x = e.clientX;
        dragger.state = newValue;
      }
      dragger.style.left = dragger.state + 'px';
    };

    const mouseup = e => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);

  });

});
