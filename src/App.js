import BootstrapNavbar from "./components/NavBar/BootstrapNavbar";
import MapGl from "./components/Map3/MapboxGLMap";
import BarChart from "./components/charts/bar/BarChart";
import React from "react";

function App() {
    const fetchQuestionData = (questionNum) =>{
        alert('questionNum'+questionNum);
    }
  return (
    <div>
      <BootstrapNavbar onQuestionChanged = {fetchQuestionData} />
      <MapGl />
      <BarChart />
    </div>
  );
}

export default App;
