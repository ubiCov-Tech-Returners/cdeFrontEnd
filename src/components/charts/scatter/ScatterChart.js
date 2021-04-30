import React from 'react';
import {Scatter} from 'react-chartjs-2';
//TODO - useState for Scatter onload ?
//TODO - useEffect and render chart in container ?
//TODO - display borough info in tooltip
//TODO reduce zoom of scatter chart - mobile view
//TODO - Scatter chart options are not working ?
function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

const ScatterChart = ({questionChartPercent}) => {

        //changing data to a collection of feature objects
        let questionChartData = questionChartPercent.map(featureCollection => featureCollection.features[0]);
        let uniqueDataTypes = [...new Set(questionChartData.map(featureObj => featureObj.properties.dataType))];
        let uniqueColours = [...new Set(questionChartData.map(featureObj => featureObj.properties.colour))];

        let xValues = questionChartData.filter(featureObj => featureObj.properties.dataType === uniqueDataTypes[0].toString()).map(featureObj => roundToTwo(featureObj.properties.percentageOfTotal));
        let yValues = questionChartData.filter(featureObj => featureObj.properties.dataType === uniqueDataTypes[1].toString()).map(featureObj => roundToTwo(featureObj.properties.percentageOfTotal));
        let output = xValues.map((x, i) => ({x: x, y: yValues[i]}));
        let scatterData = {
            labels:[ uniqueDataTypes[0].toString().toLowerCase(), uniqueDataTypes[1].toString().toLowerCase()],
            datasets: [{
                label: ' % of total: ' + uniqueDataTypes[0].toString().toLowerCase() + ' vs ' + uniqueDataTypes[1].toString().toLowerCase(),
                data: output,
                backgroundColor: uniqueColours[0].toString(),
                options: {
                    legend: {
                        display: true,
                        onHover(){alert(' % of total: ' + uniqueDataTypes[0].toString().toLowerCase() + ' vs ' + uniqueDataTypes[1].toString().toLowerCase());}
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        xAxes: [{
                            title: {
                                display: true,
                                text: uniqueDataTypes[0].toString().toLowerCase()
                            }
                        }],
                        yAxes: [{
                            title: {
                                display: true,
                                text: uniqueDataTypes[1].toString().toLowerCase()
                            }
                        }],
                    }
                },
            }],
        };




    return (

        <div>
            <Scatter data={scatterData}/>
        </div>
    )
}


export default ScatterChart;