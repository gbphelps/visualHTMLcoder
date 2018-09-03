//NOTE optional add-in

// const updateSlider = () => {
//
//   const xp = dragger2.x;
//   const yp = canvas.height - dragger2.y;
//
//   let theta0 = Math.atan(yp/xp);
//   const theta = (Math.PI/3 - theta0)/(Math.PI/3);
//
//   let r = Math.sqrt(xp*xp + yp*yp)/canvas.width;
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
//
//   updateDragger();
//
// }
