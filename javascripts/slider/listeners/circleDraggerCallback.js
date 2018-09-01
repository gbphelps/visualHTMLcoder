export const circleDraggerCallback = e => {
  let [ xPrev, yPrev ] = [ e.clientX, e.clientY ];

  const mousemove = e => {
    console.log(
      circleDragger.x,
      circleDragger.y,
      circleDragger.style.left,
      circleDragger.style.top
    );
    const diffx = e.clientX - xPrev;
    const diffy = e.clientY - yPrev;


    // const x = circleDragger.x + diffx;
    // const y = circleDragger.y - diffy;
    // setDraggerPosition({ x, y });

    const m = [diffx, -diffy];

    const magnitude2 =
      circleDragger.y*circleDragger.y + circleDragger.x*circleDragger.x;

    const tangent = [-circleDragger.y, circleDragger.x];

    const scale = (m[0]*tangent[0] + m[1]*tangent[1])/magnitude2;

    const x = circleDragger.x + tangent[0]*scale;
    const y = circleDragger.y + tangent[1]*scale;
    setDraggerPosition({x, y});

    xPrev = e.clientX;
    yPrev = e.clientY;


    document.addEventListener('mouseup', ()=>{
      document.removeEventListener('mousemove', mousemove)
    },{once: true})


  }

  document.addEventListener('mousemove', mousemove)
}

const setDraggerPosition = ({ x, y }) => {
  const left = (x + spectrumContainer.width/2) - circleDragger.diameter/2;
  const top = (spectrumContainer.width/2 - y);

  console.log(left, top);

  circleDragger.x = x;
  circleDragger.y = y;
  circleDragger.style.left = left + 'px';
  circleDragger.style.top = top + 'px';
}
