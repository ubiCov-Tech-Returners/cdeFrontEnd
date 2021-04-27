//https://sparkgeo.com/blog/build-a-react-mapboxgl-component-with-hooks/ - map
//https://docs.mapbox.com/api/maps/styles/  - styles
// https://mapbox-guide.cube.dev/dataset-and-api - data exploration tool
// https://en.wikipedia.org/wiki/GeoJSON
// https://mapbox-guide.cube.dev/frontend-and-mapbox


//useReducer
import React, {useEffect, useRef, useState} from "react";
import mapboxgl, {Layer, Feature} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
// import ReactMapGL, { Layer } from 'react-map-gl';
/*TODO - Show color legend for  different data types  */
/*TODO - Show hover tooltip with data values */
/*TODO - test Mapbox expressions https://github.com/mapbox/mapbox-gl-js/blob/main/test/expression.test.js*/


const styles = {
    // width: "100vw",  // bootstrap now handles width depending on viewport
    // height: "calc(85vh - 80px)",
    height: "calc(80vh - 80px)",
    position: "relative"
};


const MapboxGLMap = () => {
    const [map, setMap] = useState(null); // merge axios call here
    const mapContainer = useRef();

    let mapData = {};

    //Map properties
    const mBToken = 'pk.eyJ1IjoidHdpbmUxMmIiLCJhIjoiY2ttZ3hwdmJrMDF4MTJwbXRkNXN2eGExYSJ9.3BXNyT_qhst6zu9BparHGg';
    const minZoomForCircle = 7;
    const maxZoomForCircle = 16;


    const minZoomCircleRadiusBottom = 1;
    const minZoomCircleRadiusTop = 4;

    const maxZoomCircleRadiusBottom = 5;
    const maxZoomCircleRadiusTop = 50;


    useEffect(() => {
        axios.get('http://localhost:8080/mapinfo/furlough/')
            // if promise resolves ,update state
            .then(response => {
                console.log(response);
                localStorage.setItem("apiData", JSON.stringify(response.data));
            })
            //if error ,log and show default data
            .catch(err => console.log(err))

        axios.get('http://localhost:8080/mapinfo/covid/cases/')
            // if promise resolves ,update state
            .then(response => {
                console.log(response);
                localStorage.setItem("apiData2", JSON.stringify(response.data));
            })
            //if error ,log and show default data
            .catch(err => console.log(err))

        mapboxgl.accessToken = mBToken;
        const initializeMap = ({setMap, mapContainer}) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
                center: [-0.1257400, 51.50853005],// centred around London
                zoom: 9
            });

            map.on("load", () => {

                const mapDataStr = localStorage.getItem('apiData');
                const mapData = JSON.parse(mapDataStr);
                const mapDataStr2 = localStorage.getItem('apiData2');
                const mapData2 = JSON.parse(mapDataStr2);

                map.addSource('ubicov', {
                    type: 'geojson',
                    data: mapData
                });



                /*       Data Normalisation in React
                         Scaling data values in layer using MapBox expressions
                         according to https://www.theanalysisfactor.com/rescaling-variables-to-be-same/

                 */

                // common scale for all data sets 0-10
                const commonScaleBottom = 0;
                const commonScaleTop = 20;

                //Data set 1 - variables needed for scaling
                let rawValues = mapData.features.map(f => f.properties.value);
                let minValue = Math.min(...rawValues);
                let maxValue = Math.max(...rawValues);
                let rawValueRange = maxValue - minValue;

                //Data set 2 - variables needed for scaling

                let rawValues2 = mapData2.features.map(f => f.properties.value);
                let minValue2 = Math.min(...rawValues2);
                let maxValue2 = Math.max(...rawValues2);
                let rawValueRange2 = maxValue2 - minValue2;

                ///Latitude offset for Layer 2  circles
                //check solution here https://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters

                //Earth’s radius, sphere
                const R = 6378137;
                const Pi = Math.PI;


                //lat offsets in meters
                const dn = 750;



                //offsetting lat,long of layer 2 circles
                mapData2.features.forEach(feature => {

                    //Coordinate offsets in radians
                    let dLat = dn / R;

                    //OffsetPosition, decimal degrees
                    let dlatO = dLat * 180 / Pi;

                    feature.geometry.coordinates[1] += dlatO;

                });

                map.addSource('ubicov2', {
                    type: 'geojson',
                    data: mapData2
                });



                //Layer 1 - Dataset 1
                map.addLayer(
                    {
                        'id': 'ubimap-layer1',
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
                                ['interpolate', ['linear'], ['*', [
                                    '/',
                                    ['-', ['get', 'value'], minValue], rawValueRange],
                                    commonScaleTop
                                ]
                                    , commonScaleBottom, minZoomCircleRadiusBottom, commonScaleTop, minZoomCircleRadiusTop],
                                maxZoomForCircle,
                                ['interpolate', ['linear'], ['*', [
                                    '/',
                                    ['-', ['get', 'value'
                                    ],
                                        minValue
                                    ],
                                    rawValueRange
                                ],
                                    commonScaleTop
                                ]
                                    ,
                                    commonScaleBottom, maxZoomCircleRadiusBottom, commonScaleTop, maxZoomCircleRadiusTop
                                ]
                            ],
                            // Color circle from feature properties
                            'circle-color':
                                ['get', 'colour'],
                            'circle-stroke-color':
                                'black',
                            'circle-stroke-width':
                                0.75,
                            // circle opacity between 0-1 different for two data sets to show through
                            'circle-opacity':
                                0.6

                        }
                    }
                )
                ;

                //Layer 2 - Dataset 2
                map.addLayer(
                    {
                        'id': 'ubimap-layer2',
                        'type': 'circle',
                        'source': 'ubicov2',
                        'minzoom': 7,
                        'paint': {
                            // Size circle radius by value from feature properties  and zoom level
                            'circle-radius': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                minZoomForCircle,
                                ['interpolate', ['linear'], ['*', [
                                    '/',
                                    ['-', ['get', 'value'], minValue2], rawValueRange2],
                                    commonScaleTop
                                ]
                                    , commonScaleBottom, minZoomCircleRadiusBottom, commonScaleTop, minZoomCircleRadiusTop],
                                maxZoomForCircle,
                                ['interpolate', ['linear'], ['*', [
                                    '/',
                                    ['-', ['get', 'value'
                                    ],
                                        minValue2
                                    ],
                                    rawValueRange2
                                ],
                                    commonScaleTop
                                ]
                                    ,
                                    commonScaleBottom, maxZoomCircleRadiusBottom, commonScaleTop, maxZoomCircleRadiusTop
                                ]
                            ],
                            // Color circle from feature properties
                            'circle-color':
                                ['get', 'colour'],
                            'circle-stroke-color':
                                'black',
                            'circle-stroke-width':
                                0.8,
                            // circle opacity between 0-1 different for two data sets to show through
                            'circle-opacity':
                                0.3

                        }
                    }
                )
                ;

                setMap(map);
                map.resize();
            });
        };

        if (!map) initializeMap({setMap, mapContainer});
    }, [map]);//TODO pass empty dependency list instead of map?


    return <div ref={el => (mapContainer.current = el)} style={styles}>
        {/* <Layer {...parkLayer} paint={{ 'fill-color': parkColor }} /> */}
    </div>;
};


export default MapboxGLMap;