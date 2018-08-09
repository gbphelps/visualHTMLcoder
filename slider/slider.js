
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

  dragger.addEventListener('mousedown', e => {
    let x = e.clientX;

    const mousemove = e => {
      const props = dragger.style;
      if (e.clientX > slider.getBoundingClientRect().right){
        x = slider.getBoundingClientRect().right;
        props.left = '290px';
      } else if (e.clientX < slider.getBoundingClientRect().left) {
        x = slider.getBoundingClientRect().left;
        props.left = '0px';
      } else {
        const diff = e.clientX - x;
        props.left = +props.left.slice(0, props.left.length - 2) + diff + 'px';
        x = e.clientX;
      }
    };

    const mouseup = e => {
      document.removeEventListener('mousemove', mousemove);
      document.removeEventListener('mouseup', mouseup);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);

  });

});
