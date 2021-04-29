//https://sparkgeo.com/blog/build-a-react-mapboxgl-component-with-hooks/ - map
//https://docs.mapbox.com/api/maps/styles/  - styles
// https://mapbox-guide.cube.dev/dataset-and-api - data exploration tool
// https://en.wikipedia.org/wiki/GeoJSON
// https://mapbox-guide.cube.dev/frontend-and-mapbox
//useReducer
import React, {useEffect, useRef, useState} from "react";
import mapboxgl  from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import ReactMapGL, { Layer } from 'react-map-gl';
/*TODO - Show color legend for  different data types  */
/*TODO - test Mapbox expressions https://github.com/mapbox/mapbox-gl-js/blob/main/test/expression.test.js*/
const styles = {
    // width: "100vw",  // bootstrap now handles width depending on viewport
    // height: "calc(85vh - 80px)",
    height: "calc(80vh - 80px)",
    position: "relative"
};
const MapboxGLMap = ({mapDataLayerOne, mapDataLayerTwo}) => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef();
    //Map properties
    const mBToken = 'pk.eyJ1IjoidHdpbmUxMmIiLCJhIjoiY2ttZ3hwdmJrMDF4MTJwbXRkNXN2eGExYSJ9.3BXNyT_qhst6zu9BparHGg';
    const minZoomForCircle = 7;
    const maxZoomForCircle = 16;
    const minZoomCircleRadiusBottom = 1;
    const minZoomCircleRadiusTop = 4;
    const maxZoomCircleRadiusBottom = 5;
    const maxZoomCircleRadiusTop = 50;
    useEffect(() => {
        mapboxgl.accessToken = mBToken;
        const initializeMap = ({setMap, mapContainer}) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/dark-v10", // stylesheet location
                center: [-0.1257400, 51.50853005],// centred around London
                zoom: 9
            });
            map.on("load", () => {
                map.addSource('ubicov', {
                    type: 'geojson',
                    data: mapDataLayerOne
                });
                console.log(mapDataLayerOne);
                /*  Data Normalisation in React
                    Scaling data values in layer using MapBox expressions
                    according to https://www.theanalysisfactor.com/rescaling-variables-to-be-same/
                */
                // common scale for all data sets 0-10
                const commonScaleBottom = 0;
                const commonScaleTop = 20;
                //Data set 1 - variables needed for scaling
                let rawValues = mapDataLayerOne.features.map(f => f.properties.value);
                let minValue = Math.min(...rawValues);
                let maxValue = Math.max(...rawValues);
                let rawValueRange = maxValue - minValue;
                //Data set 2 - variables needed for scaling
                let rawValues2 = mapDataLayerTwo.features.map(f => f.properties.value);
                let minValue2 = Math.min(...rawValues2);
                let maxValue2 = Math.max(...rawValues2);
                let rawValueRange2 = maxValue2 - minValue2;
                ///Latitude offset for Layer 2  circles
                //check solution here https://gis.stackexchange.com/questions/2951/algorithm-for-offsetting-a-latitude-longitude-by-some-amount-of-meters
                //Earth's radius, sphere
                const R = 6378137;
                const Pi = Math.PI;
                //lat offset in meters
                const dn = 750;
                //offsetting lat,long of layer 2 circles
                mapDataLayerTwo.features.forEach(feature => {
                    //Coordinate offsets in radians
                    let dLat = dn / R;
                    //OffsetPosition, decimal degrees
                    let dlatO = dLat * 180 / Pi;
                    feature.geometry.coordinates[1] += dlatO;
                });
                map.addSource('ubicov2', {
                    type: 'geojson',
                    data: mapDataLayerTwo
                });
                //Layer 1 - Dataset 1
                map.addLayer({
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
                });
                //Layer 2 - Dataset 2
                map.addLayer({
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
                });

                // Create a popup, but don't add it to the map yet.
                const popup = new mapboxgl.Popup({
                    closeButton: false,
                    closeOnClick: false
                });
                map.on('mouseenter', 'ubimap-layer1', function (e) {
                    // Change the cursor style as a UI indicator.
                    map.getCanvas().style.cursor = 'pointer';
                    let coordinates = e.features[0].geometry.coordinates.slice();
                    // extracting tool tip text for second data set
                    let layerOneBorough = e.features[0].properties.borough;
                    let featureObjTwo = mapDataLayerTwo.features.find(featureObj => featureObj.properties.borough === layerOneBorough);
                    let popUpTextTwo = `<br />${featureObjTwo.properties.dataType}: ${featureObjTwo.properties.value}`;

                    let popUpText = `${e.features[0].properties.description}<br />${e.features[0].properties.dataType}: ${e.features[0].properties.value}`;
                    popUpText += popUpTextTwo;
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(coordinates).setHTML(popUpText).addTo(map);
                });
                map.on('mouseleave', 'ubimap-layer1', function () {
                    map.getCanvas().style.cursor = '';
                    popup.remove();
                });
                setMap(map);
                map.resize();
            });
        };
        if (!map) initializeMap({setMap, mapContainer});
    }, [map, mapDataLayerOne, mapDataLayerTwo]);
    return <div ref={el => (mapContainer.current = el)} style={styles}>
        {/* <Layer {...parkLayer} paint={{ 'fill-color': parkColor }} /> */}
    </div>;
};
export default MapboxGLMap;