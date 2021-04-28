import React from 'react';
import {Scatter} from 'react-chartjs-2';

function ScatterChart() {

    const data = {
        datasets: [{
            label: 'Scatter Dataset',
            data: [ { x: 65, y: 75 },
                { x: 59, y: 49 },
                { x: 80, y: 90 },
                { x: 81, y: 29 },
                { x: 56, y: 36 },
                { x: 55, y: 25 },
                { x: 40, y: 18 },],
            backgroundColor: 'rgb(255, 99, 132)'
        }],
    };
    return (
        <div>
            <Scatter data={data}/>
        </div>
    )
}




export default ScatterChart;
