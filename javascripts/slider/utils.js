export const format = color => `rgb(${color[0]},${color[1]},${color[2]})`;

export const create = (tag, parent, props, style) => {
  const element = document.createElement(tag);
  Object.assign(element, props);
  parent.append(element);
  if (style) Object.assign(element.style, style);
  return element;
};

export const calcColor = progress => {
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

export const revCalc = color => {
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
  return progress;
}

export const generateColor = color => {
  const canvas = document.getElementById('canvas');

  let [min,mid,max] = Array.from(color).sort((x,y)=> x-y);
  const r = max / 255;
  const theta = min / max;
  const missingColor = 255 * (mid - min) / (max - min);

  let parentColor = [];
  if (max !== min){
    color.forEach(hue =>{
      switch (hue){
        case max: parentColor.push(255); break;
        case min: parentColor.push(0); break;
        default: parentColor.push(missingColor); break;
      }
    });
  } else {
    parentColor = canvas.color
  }

  const theta0 = Math.PI/3 - (Math.PI/3 * theta);
  let x = Math.sqrt(3) * max * canvas.innerWidth /2 /255 /Math.cos(Math.PI/6-theta0) /Math.sqrt(1+ Math.tan(theta0) * Math.tan(theta0));
  let y = canvas.innerHeight - x * Math.tan(theta0);

  if (max === 0){
    x = 0;
    y = canvas.innerHeight;
  } else if (min === 255){
    x = canvas.innerWidth;
    y = canvas.innerHeight;
  }

  const progress = revCalc(parentColor)*Math.PI/3;
  const triangleDragger = {x,y};
  const colorTrio = {red: color[0]/255*200, green: color[1]/255*200, blue: color[2]/255*200};
  return {triangleDragger, progress, colorTrio};

};
