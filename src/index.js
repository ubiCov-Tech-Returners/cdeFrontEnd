import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import BarChart from "./components/charts/bar/BarChart";
import UbiNavBar from './components/UbiNavBar/UbiNavBar';
import Map from './components/Map/Map';
import Map2 from './components/Map2/Map';
import MapGl from './components/Map3/MapboxGLMap';
import BootstrapNavbar from './components/NavBar/BootstrapNavbar';
import App from './components/tutorial/App';
// import SimpleMap from './components/tutorial/SimpleMap';
// import Mtut from './components/tutorial/Mtut';

import 'bootstrap/dist/css/bootstrap.min.css'; // import bootstrap CSS

ReactDOM.render(
  <React.StrictMode>
    <BootstrapNavbar />
    <MapGl />
    <BarChart />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
