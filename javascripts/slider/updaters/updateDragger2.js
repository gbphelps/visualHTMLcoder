import { format } from '../utils'

export const updateDragger2 = () => {

    const xp = dragger2.x;
    const yp = canvas.innerHeight - dragger2.y;

    let theta0 = Math.atan(yp/xp);
    const theta = (Math.PI/3 - theta0)/(Math.PI/3);

    let r = Math.sqrt(xp*xp + yp*yp)/canvas.innerWidth;
    r = r * Math.cos(Math.PI/6 - theta0) / (Math.sqrt(3)/2);

    let R = Math.round((canvas.color[0] + (255-canvas.color[0])*theta) * r) || 0;
    let G = Math.round((canvas.color[1] + (255-canvas.color[1])*theta) * r) || 0;
    let B = Math.round((canvas.color[2] + (255-canvas.color[2])*theta) * r) || 0;

    dragger2.color = [R,G,B];
    pip.style.background = format([R,G,B]);
}
