import BootstrapNavbar from "./components/NavBar/BootstrapNavbar";
import MapGl from "./components/Map3/MapboxGLMap";
import BarChart from "./components/charts/bar/BarChart";
import ScatterChart from "./components/charts/scatter/ScatterChart";

import React, { useState } from "react";
import axios from "axios";

function App() {

  const [questionSelected, setQuestionSelected] = useState("3");
  const [mapDataLayerOne, setMapDataLayerOne] = useState(null);
  const [mapDataLayerTwo, setMapDataLayerTwo] = useState(null);

  const fetchQuestionData = (questionNum) =>{
      setQuestionSelected(questionNum)
    
      if(questionNum === "3") {

        axios.get('http://localhost:8080/mapinfo/furlough/')
        // if promise resolves ,update state
        .then(response => {
            setMapDataLayerOne(response.data)
        })
        //if error ,log and show default data
        .catch(err => console.log(err))

        axios.get('http://localhost:8080/mapinfo/covid/cases/')
        // if promise resolves ,update state
        .then(response => {
            setMapDataLayerTwo(response.data);
        })
        //if error ,log and show default data
        .catch(err => console.log(err))
      }
  }


  return (
    <div>
      <BootstrapNavbar onQuestionChanged = {fetchQuestionData} />
      <h1>You picked: {questionSelected}</h1>
      <MapGl mapDataLayerOne={mapDataLayerOne} mapDataLayerTwo={mapDataLayerTwo} />
{/*
      <BarChart />
*/}
        <ScatterChart />
    </div>
  );
}

export default App;
