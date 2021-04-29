import BootstrapNavbar from "./components/NavBar/BootstrapNavbar";
import MapGl from "./components/Map3/MapboxGLMap";
import ScatterChart from "./components/charts/scatter/ScatterChart";
import React, { useState, useEffect } from "react";
import axios from "axios";



function App() {
    const [mapDataLayerOne, setMapDataLayerOne] = useState(null);
    const [mapDataLayerTwo, setMapDataLayerTwo] = useState(null);
    const [questionChartPercent, setQuestionChartPercent] = useState(null);

    const [loading, setLoading] = useState(true);

    // Just used to default to question 3
    useEffect(() => {
        setLoading(true);
        fetchQuestionData("3");
    }, [setLoading]);

    const fetchQuestionData = (questionNum) =>{
        setLoading(true);
        if(questionNum === "3") {
            axios.get('http://localhost:8080/mapinfo/furlough/')
                // if promise resolves ,update state
                .then(response => {
                    setMapDataLayerOne(response.data)
                })
                //if error ,log and show default data
                .catch(err => console.error(err))
            axios.get('http://localhost:8080/mapinfo/covid/cases/')
                // if promise resolves ,update state
                .then(response => {
                    setMapDataLayerTwo(response.data);
                    setLoading(false);
                })
                //if error ,log and show default data
                .catch(err => console.error(err))

            axios.get('http://localhost:8080/questions/3/')
                // if promise resolves ,update state
                .then(response => {
                    setQuestionChartPercent(response.data);
                    setLoading(false);
                })
                //if error ,log and show default data
                .catch(err => console.error(err))

        }else if(questionNum === "1") {
            //TODO - change maps to take data from questions end point
            axios.get('http://localhost:8080/mapinfo/furlough/')
                // if promise resolves ,update state
                .then(response => {
                    setMapDataLayerOne(response.data)
                })
                //if error ,log and show default data
                .catch(err => console.error(err))
            axios.get('http://localhost:8080/mapinfo/covid/cases/')
                // if promise resolves ,update state
                .then(response => {
                    setMapDataLayerTwo(response.data);
                    setLoading(false);
                })
                //if error ,log and show default data
                .catch(err => console.error(err))

            axios.get('http://localhost:8080/questions/1/')
                // if promise resolves ,update state
                .then(response => {
                    setQuestionChartPercent(response.data);
                    setLoading(false);
                })
                //if error ,log and show default data
                .catch(err => console.error(err))

            }
        }
    return (
        <div>
            <BootstrapNavbar onQuestionChanged = {fetchQuestionData} />
            {loading && <h3>Loading mapping data...</h3>}
            {(mapDataLayerOne && mapDataLayerTwo && questionChartPercent && !loading) &&
            <MapGl mapDataLayerOne={mapDataLayerOne} mapDataLayerTwo={mapDataLayerTwo} questionChartPercent={questionChartPercent} />
            }
            {(questionChartPercent && !loading) &&
            <ScatterChart  questionChartPercent={questionChartPercent} />
            }


    </div>
  );
}

export default App;
