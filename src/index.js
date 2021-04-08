import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import BarChart from "./components/charts/bar/BarChart";
import UbiNavBar from './components/UbiNavBar/UbiNavBar';
import Map from './components/Map/Map';
import Map2 from './components/Map/Map2';
import BootstrapNavbar from './components/NavBar/BootstrapNavbar';

ReactDOM.render(
  <React.StrictMode>
    <UbiNavBar />
    <Map />
    <BarChart />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
