
import React from 'react';
import {Scatter} from 'react-chartjs-2';
//TODO - add Loading data code to Scatter - remove dummy dataset
//TODO - display borough info in tooltip
const ScatterChart = ({questionChartData}) => {

    let scatterData = {
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
    if (questionChartData) {
        let uniqueDataTypes = [...new Set(questionChartData.map(featureObj => featureObj.properties.dataType))];

        let xValues = questionChartData.filter(featureObj => featureObj.properties.dataType === uniqueDataTypes[0].toString()).map(featureObj => featureObj.properties.value);
        let yValues = questionChartData.filter(featureObj => featureObj.properties.dataType === uniqueDataTypes[1].toString()).map(featureObj => featureObj.properties.value);
        let output = xValues.map((x,i) => ({x: x, y: yValues[i]}));
        console.log('x,y data set for  scatter ' + output);
        scatterData = {
            datasets: [{
                label: uniqueDataTypes[0].toString()+' Vs '+uniqueDataTypes[1].toString(),
                data: output,
                backgroundColor: 'rgb(255, 99, 132)'
            }],
        };


    }

    return (
        <div>
            <Scatter data={scatterData}/>
        </div>
    )
}




export default ScatterChart;