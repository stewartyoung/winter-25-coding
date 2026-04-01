import React, { useState, type FC } from 'react';
// import "./dumbSlider.css";

const DumbSlider: FC<{min: number, max: number}> = ({min, max}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - 1);
    setMinVal(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + 1);
    setMaxVal(value);
  };

  return (
    <div className="container">
      <p>
        Selected Range: {minVal} - {maxVal}
      </p>

      <div className="dumb-slider">
      <div className="dumb-slider__track" />
        <div
            className="dumb-slider__range"
            style={{
            left: `${(minVal / max) * 100}%`,
            right: `${100 - (maxVal / max) * 100}%`
            }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={handleMinChange}
          className="thumb thumb--left"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb thumb--right"
        />
      </div>
    </div>
  );
}

export default DumbSlider;