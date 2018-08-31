import { create } from '../utils';

export const initializeSlider = (sliderWidth, sliderHeight) => {
  const slider =
    create('DIV', container, {
      id: 'slider',
      height: sliderHeight,
      width: sliderWidth
    },{
      position: 'relative',
      width: sliderWidth + 'px',
      height: sliderHeight + 'px'
    });
}
