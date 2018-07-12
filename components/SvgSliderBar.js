import React from 'react';
import PropTypes from 'prop-types';

const SvgSliderBar = ({width, height, percentDone, cb, options}) => {
  const margin = height / 2;
  const barWidth = width - height;
  return (
    <svg width={width} height={height} onClick={cb}>
      <rect id="slider-rect" x={margin} y={margin / 2} width={barWidth} height={margin} className={options.bgClass} rx={margin / 2} ry={margin / 2}/>
      <rect x={margin} y={margin / 2} width={barWidth * percentDone} height={margin} className={options.fgClass} rx={margin / 2} ry={margin / 2}/>
      <circle cx={barWidth * percentDone + margin} cy={margin} r={margin} className={options.fgClass}/>
      <circle cx={barWidth * percentDone + margin} cy={margin} r={1} className={options.fgClass}/>
    </svg>
  );
};

SvgSliderBar.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  percentDone: PropTypes.number,
  cb: PropTypes.func,
  options: PropTypes.object
};

SvgSliderBar.defaultProps = {
  width: 100,
  height: 10,
  percentDone: 0.5,
  cb: (event) => {
    const e = event.target;
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;
    alert("x: "+x+" y:"+y);
  },
  options: {
    bgClass: 'slider-bg',
    fgClass: 'slider-fg'
  }
};

export default SvgSliderBar;
