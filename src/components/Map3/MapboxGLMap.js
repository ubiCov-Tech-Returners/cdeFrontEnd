//https://sparkgeo.com/blog/build-a-react-mapboxgl-component-with-hooks/ - map
//https://docs.mapbox.com/api/maps/styles/  - styles
// https://mapbox-guide.cube.dev/dataset-and-api - data exploration tool
// https://en.wikipedia.org/wiki/GeoJSON
// https://mapbox-guide.cube.dev/frontend-and-mapbox

//Add value: ???  to properties of GeoJson

//useReducer
import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Layer, Feature } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import ReactMapGL, { Layer } from 'react-map-gl';
// import SnotelSites from './Icc_snotel_sites.json';
/*TODO - move hardcoded values into properties file */
/*TODO - Use UbiCov data not earthquake */
/*TODO - Show hover tooltip with data -kepler style */




const styles = {
    // width: "100vw",  // bootstrap now handles width depending on viewport
    // height: "calc(85vh - 80px)",
    height: "calc(80vh - 80px)",
    position: "relative"
};


const MapboxGLMap = () => {
    const [map, setMap] = useState(null); // merge axios call here
    const mapContainer = useRef();



    let mapData = {
        "type": "FeatureCollection",
              "features": [
            { "type": "Feature", "properties": { "description": "Brent","title": "London Borough of Brent", "value": 2.8, "datatype": "cases","colour": "rgb(200,55,207)"}, "geometry": { "type": "Point", "coordinates": [ -0.30174587349631565, 51.552182823098406] } },
            { "type": "Feature", "properties": { "description": "Brent","title": "London Borough of Brent", "value": 5.8,"datatype": "cases",  "colour": "rgb(000,22,207)"}, "geometry": { "type": "Point", "coordinates": [ -0.011583929705352602, 51.463692453353815] } },
            { "type": "Feature", "properties": { "description": "Brent","title": "London Borough of Brent", "value": 4.0,"datatype": "cases",  "colour": "rgb(106,55,207)" }, "geometry": { "type": "Point", "coordinates": [ -0.030458421517778334, 51.388296156862964] }},
            { "type": "Feature", "properties": { "description": "Brent","title": "London Borough of Brent", "value": 3.7,"datatype": "cases",  "colour": "rgb(100,22,207)"}, "geometry": { "type": "Point", "coordinates": [ -0.018132985217334863, 51.57993972933622] }

            }

        ]
    };

    //Map properties
    const mBToken = 'pk.eyJ1IjoidHdpbmUxMmIiLCJhIjoiY2ttZ3hwdmJrMDF4MTJwbXRkNXN2eGExYSJ9.3BXNyT_qhst6zu9BparHGg';
    const minZoomForCircle = 7;
    const maxZoomForCircle = 16;
    const valueRangeBottom = 1;
    const valueRangeTop= 6;
    const minZoomCircleRadiusBottom= 1;
    const minZoomCircleRadiusTop= 4;

    const maxZoomCircleRadiusBottom= 5;
    const maxZoomCircleRadiusTop= 50;




    useEffect(() => {
        mapboxgl.accessToken = mBToken;
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
                center: [-0.1257400, 51.50853005],//centred around London
                zoom: 9
            });

            map.on("load", () => {



                map.addSource('ubicov', {
                    type: 'geojson',
                    data: mapData
                });

                map.addLayer(
                    {
                        'id': 'ubimap-point',
                        'type': 'circle',
                        'source': 'ubicov',
                        'minzoom': 7,
                        'paint': {
                            // Size circle radius by value from feature properties  and zoom level
                            'circle-radius': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                minZoomForCircle,
                                ['interpolate', ['linear'], ['get', 'value'], valueRangeBottom, minZoomCircleRadiusBottom, valueRangeTop, minZoomCircleRadiusTop],
                                maxZoomForCircle,
                                ['interpolate', ['linear'], ['get', 'value'], valueRangeBottom, maxZoomCircleRadiusBottom, valueRangeTop, maxZoomCircleRadiusTop]
                            ],
                            // Color circle from feature properties
                            'circle-color': ['get', 'colour'],
                            'circle-stroke-color': 'white',
                            'circle-stroke-width': 1,

                            // TODO - change or remove as heat map is NOT being used
                            //  Transition from heatmap to circle layer by zoom level
                            'circle-opacity': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                7,
                                0,
                                8,
                                1
                            ]
                        }
                    }
                );



        setMap(map);
        map.resize();
    });
};

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);


    return <div ref={el => (mapContainer.current = el)} style={styles} >
        {/* <Layer {...parkLayer} paint={{ 'fill-color': parkColor }} /> */}
    </div>;
};


export default MapboxGLMap;