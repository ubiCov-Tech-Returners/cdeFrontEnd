import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';
import './styles.css';

export default function App() {
    let [viewport, setviewport] = useState({
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8,
        width: window.innerWidth,
        height: window.innerHeight,
        pitch: 50
    })

    return (
        <div>
            <ReactMapGl
                mapStyle={'mapbox://styles/mapbox/dark-v9'}
                mapboxApiAccessToken={
                    "pk.eyJ1IjoibmhlcmFjIiwiYSI6ImNrbWV5aTd0ODJrdnIyb2xheDVkdTBrencifQ.TOYzZxMxcDMH5vDHxd5Irw"
                }
                {...viewport}
                onViewportChange={(newView) => setviewport(newView)}
            >
            </ReactMapGl>
        </div >



    );
}