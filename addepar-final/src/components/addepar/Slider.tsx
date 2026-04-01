import { useState, type FC, useEffect, useRef, useCallback } from 'react';
import './slider.css';
interface ValueRange {
    min: number,
    max: number
}

const Slider: FC<ValueRange> = ({ min, max }: ValueRange) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    // using useRef allows direct DOM access without causing re-renders
    const minValRef = useRef<HTMLInputElement>(null);
    const maxValRef = useRef<HTMLInputElement>(null);
    const range = useRef<HTMLDivElement>(null);

    const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min) * 100)), [min, max])

    // min value effect
    useEffect(() => {
        if (maxValRef.current) {
            const minPercent = getPercent(minVal);
            const maxPercent = getPercent(Number(maxValRef.current.value));

            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [minVal, getPercent]);

    // max value effect
    useEffect(() => {
        if (minValRef.current) {
            const minPercent = getPercent(Number(minValRef.current.value));
            const maxPercent = getPercent(maxVal);

            if (range.current) {
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }, [maxVal, getPercent]);

    // Set width of the range to decrease from the left side
    return (
        <div className="container">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                ref={minValRef}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    event.target.value = value.toString();
                }}
                className={`slider-input slider-input--zindex-3${minVal > max - 100 ? ' slider-input--zindex-5' : ''}`}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                ref={maxValRef}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    event.target.value = value.toString();
                }}
                className="slider-input slider-input--zindex-4"
            />
            <div className="slider">
                <div className="slider-track" />
                <div ref={range} className="slider-range" />
                <div className="slider-left-value">{minVal}</div>
                <div className="slider-right-value">{maxVal}</div>
            </div>
        </div>
    )
};

export default Slider;