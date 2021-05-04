import BootstrapNavbar from "./components/NavBar/BootstrapNavbar";
import MapGl from "./components/Map3/MapboxGLMap";
import ScatterChart from "./components/charts/scatter/ScatterChart";
import QuestionInfoText from "./components/QuestionInfoArea/QuestionInfo";
import React, { useState, useEffect } from "react";
import axios from "axios";


function App() {
    const [questionChartPercent, setQuestionChartPercent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [questionInfo, setQuestionInfo] = useState("Question");

    // Just used to default to question 3
    useEffect(() => {
        setLoading(true);
        fetchQuestionData("3");
    }, [setLoading]);

    const fetchQuestionData = (questionNum) => {
        setLoading(true);
        if (questionNum === "3") {

            axios.get('http://localhost:8080/questions/3/')
                // if promise resolves ,update state
                .then(response => {
                    setQuestionChartPercent(response.data);
                    setQuestionInfo("How has Covid-19 affected businesses in your area?");  // sets question info state
                    setLoading(false);
                })
                //if error ,log and show default data
                .catch(err => console.error(err))

        } else if (questionNum === "1") {


            axios.get('http://localhost:8080/questions/1/')
                // if promise resolves ,update state
                .then(response => {
                    setQuestionChartPercent(response.data);
                    setQuestionInfo("Is vaccination uptake lesser in areas with lower income?");  // sets question info state
                    setLoading(false);
                })
                //if error ,log and show default data
                .catch(err => console.error(err))

        }
    }
    return (
        <div>
            <QuestionInfoText questionInfo={questionInfo} />
            <BootstrapNavbar onQuestionChanged={fetchQuestionData} />
            {loading && <h3>Loading mapping data...</h3>}
            {(questionChartPercent && !loading) &&
                <MapGl questionChartPercent={questionChartPercent} />
            }
            {(questionChartPercent && !loading) &&
                <ScatterChart questionChartPercent={questionChartPercent} />
            }



        </div>
    );
}

export default App;
