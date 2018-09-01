export const circleDraggerCallback = e => {
  let [ xPrev, yPrev ] = [ e.clientX, e.clientY ];

  const mousemove = e => {
    const diffx = e.clientX - xPrev;
    const diffy = e.clientY - yPrev;
    console.log('moving');

    document.addEventListener('mouseup', ()=>{
      document.removeEventListener('mousemove', mousemove)
    },{once: true})


  }

  document.addEventListener('mousemove', mousemove)
}
