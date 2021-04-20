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



const styles = {
    // width: "100vw",  // bootstrap now handles width depending on viewport
    // height: "calc(85vh - 80px)",
    height: "calc(80vh - 80px)",
    position: "relative"
};


const MapboxGLMap = () => {
    const [map, setMap] = useState(null); // merge axios call here
    const mapContainer = useRef();

    const data = {
        "type": "FeatureCollection",
        "features": [
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        "-0.30174587349631565",
                        "51.552182823098406"
                    ]
                },
                "type": "feature",
                "properties": {
                    "description": "Brent",
                    "makerSymbol": "rail-metro",
                    "title": "London Borough of Brent",
                    "url": "http://localhost:3000",
                    "lines": [
                        "blue"
                    ],
                    "address": null
                }
            }
        ]
    };

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoidHdpbmUxMmIiLCJhIjoiY2ttZ3hwdmJrMDF4MTJwbXRkNXN2eGExYSJ9.3BXNyT_qhst6zu9BparHGg';
        const initializeMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
                center: [-0.1257400, 51.50853005],
                zoom: 9
            });

            map.on("load", () => {
                map.addSource('earthquakes', {
                    type: 'geojson',
                    data:
                        'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                    cluster: true,
                    clusterMaxZoom: 14, // Max zoom to cluster points on
                    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                });

                map.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'earthquakes',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            '#51bbd6',
                            100,
                            '#f1f075',
                            750,
                            '#f28cb1'
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20, 100,
                            30,
                            750,
                            40
                        ]
                    }
                });

                map.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'earthquakes',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': '{point_count_abbreviated}',
                        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                        'text-size': 12
                    }
                });

                map.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'earthquakes',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 4,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff'
                    }
                });

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