import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';


function Map2() {
    const [viewport, setViewport] = useState({
        width: '100vw',
        height: '85vh',
        latitude: -0.12266953629477939,
        longitude: 51.503865974282206,
        zoom: 10
    });

    return (
        <ReactMapGL
            {...viewport}>Map here</ReactMapGL>
    )
}

export default Map2;
