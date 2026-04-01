import type { FC } from "react";
import "./barChart.css";

const BarChart: FC<{arr: number[]}> = ({arr}) => {
    const maxValue = Math.max(...arr);
    // want to render div of divs where the height of divs are el/maxValue%

    // [100, 4, 6, 7, 8, 9, 10, 71, 43, 23, 14]
    return (
        <>
            <div className="bar-chart">
                {arr.map((el: number, idx: number) => {
                    return <div 
                        key={idx} 
                        className="bar" 
                        style={{height: `${(el / maxValue) * 100}%`, width: `${100 / arr.length}%`}}>
                            <p className="bar-number">{el}</p>
                        </div>
                })}
            </div>
        </>
    )
} 
export default BarChart;