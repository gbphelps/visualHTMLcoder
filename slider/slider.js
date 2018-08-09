
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
  dragger.state = 0;

  dragger.addEventListener('mousedown', e => {
    let x = e.clientX;

    const mousemove = e => {
      const diff = e.clientX - x;
      const newValue = dragger.state + diff;
      if (newValue > 290){
        x = slider.getBoundingClientRect().right - 10;
        dragger.state = 290;
      } else if (newValue < 0) {
        x = slider.getBoundingClientRect().left +10;
        dragger.state = 0;
      } else {
        x = e.clientX;
        dragger.state = newValue;
      }
      dragger.style.left = dragger.state + 'px';

      const progress = dragger.state/290 * 6;
      let color;

      if (progress < 1){
        const sat = Math.floor(256 * progress);
        color = `rgba(255,${sat},0,1)`;
      } else if (progress < 2) {
        const sat = Math.floor(256 * (1 - (progress - 1)));
        color = `rgba(${sat},255,0,1)`;
      } else if (progress < 3) {
        const sat = Math.floor(256 * (progress - 2));
        color = `rgba(0,255,${sat},1)`;
      } else if (progress < 4) {
        const sat = Math.floor(256 * (1 - (progress - 3)));
        color = `rgba(0,${sat},255,1)`;
      } else if (progress < 5) {
        const sat = Math.floor(256 * (progress - 4));
        color = `rgba(${sat},0,255,1)`;
      } else {
        const sat = Math.floor(256 * (1 - (progress - 5)));
        color = `rgba(255,0,${sat},1)`;
      }

      dragger.style.background = color;
      ctx.fillStyle = color;
      ctx.fillRect(0,0,100,100);
    };

    const mouseup = e => {
      console.log('firing');
      document.removeEventListener('mousemove', mousemove);
    };

    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup, {once: true});

  });

});
