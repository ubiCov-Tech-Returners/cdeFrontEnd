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
/*TODO - Circle Radius should increase /decrease according to data values */
/*TODO - Show a second data set as a layer or different source */
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

    let data = {
        "type": "FeatureCollection",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
            { "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.3, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -151.5129, 63.1016, 300.0 ] } },
            { "type": "Feature", "properties": { "id": "ak16994519", "mag": 1.7, "time": 1507425289659, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -150.4048, 63.1224, 105.5 ] } }

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


                // DATA SET 1 DEMO

                map.addSource('earthquakes', {
                    type: 'geojson',
                    data: {
                        "type": "FeatureCollection",
                        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                        "features": [
                            { "type": "Feature", "properties": { "id": "ak16994521", "mag": 2.8, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -0.30174587349631565, 51.552182823098406, 1.8 ] } },
                            { "type": "Feature", "properties": { "id": "ak16994521", "mag": 5.8, "time": 1507425650893, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -0.011583929705352602, 51.463692453353815, 5.8 ] } },
                            { "type": "Feature", "properties": { "id": "ak16994519", "mag": 4.0, "time": 1507425289659, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -0.030458421517778334, 51.388296156862964, 1.5 ] }},
                            { "type": "Feature", "properties": { "id": "ak16994519", "mag": 3.7, "time": 1507425289659, "felt": null, "tsunami": 0 }, "geometry": { "type": "Point", "coordinates": [ -0.018132985217334863, 51.57993972933622, 1005.5 ] }

                            }

                        ]
                    }/*,
                    cluster: true,
                    clusterMaxZoom: 14, // Max zoom to cluster points on
                    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)*/
                });

                map.addLayer(
                    {
                        'id': 'earthquakes-point',
                        'type': 'circle',
                        'source': 'earthquakes',
                        'minzoom': 7,
                        'paint': {
// Size circle radius by earthquake magnitude and zoom level
                            'circle-radius': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                7,
                                ['interpolate', ['linear'], ['get', 'mag'], 1, 1, 6, 4],
                                16,
                                ['interpolate', ['linear'], ['get', 'mag'], 1, 5, 6, 50]
                            ],
// Color circle by earthquake magnitude
                            'circle-color': [
                                'interpolate',
                                ['linear'],
                                ['get', 'mag'],
                                1,
                                'rgb(103,169,207)',
                                2,
                                'rgb(103,169,207)',
                                3,
                                'rgb(103,169,207)',
                                4,
                                'rgb(103,169,207)',
                                5,
                                'rgb(103,169,207)',
                                6,
                                'rgb(103,169,207)',
                            ],
                            'circle-stroke-color': 'white',
                            'circle-stroke-width': 1,
// Transition from heatmap to circle layer by zoom level
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
                    },
                    'waterway-label'
                );


              /*  map.addLayer({
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
*/


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