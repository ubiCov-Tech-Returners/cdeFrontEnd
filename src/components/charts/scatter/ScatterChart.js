
import React from 'react';
import {Scatter} from 'react-chartjs-2';
//TODO - useState for Scatter onload ?

//TODO - add Loading data code to Scatter - remove dummy dataset
//TODO - display borough info in tooltip
//TODO reduce zoom of scatter chart - mobile view
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
const ScatterChart = ({questionChartPercent}) => {

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
    if (questionChartPercent){
        //changing data to a collection of feature objects
        let questionChartData = questionChartPercent.map(featureCollection => featureCollection.features[0]);
        let uniqueDataTypes = [...new Set(questionChartData.map(featureObj => featureObj.properties.dataType))];
        let xValues = questionChartData.filter(featureObj => featureObj.properties.dataType === uniqueDataTypes[0].toString()).map(featureObj => roundToTwo(featureObj.properties.percentageOfTotal));
        let yValues = questionChartData.filter(featureObj => featureObj.properties.dataType === uniqueDataTypes[1].toString()).map(featureObj => roundToTwo(featureObj.properties.percentageOfTotal));
        let output = xValues.map((x,i) => ({x: x, y: yValues[i]}));
        scatterData = {
            datasets: [{
                label: ' % of total: '+uniqueDataTypes[0].toString().toLowerCase()+' vs '+uniqueDataTypes[1].toString().toLowerCase(),
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