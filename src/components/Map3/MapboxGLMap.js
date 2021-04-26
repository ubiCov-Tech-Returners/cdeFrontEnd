//https://sparkgeo.com/blog/build-a-react-mapboxgl-component-with-hooks/ - map
//https://docs.mapbox.com/api/maps/styles/  - styles
// https://mapbox-guide.cube.dev/dataset-and-api - data exploration tool
// https://en.wikipedia.org/wiki/GeoJSON
// https://mapbox-guide.cube.dev/frontend-and-mapbox


//useReducer
import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { Layer, Feature } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
// import ReactMapGL, { Layer } from 'react-map-gl';
/*TODO - Pass normalised data for furlough */
/*TODO - Display covid cases as second layer of circles - normalise covid cases*/
/*TODO - Show hover tooltip with data values */


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


    /*  let mapData2 = {
          "type": "FeatureCollection",
          "features": [
              {
                  "type": "Feature",
                  "properties": {
                      "Borough": "Brent",
                      "description": "London Borough of Brent",
                      "value": 6.8,
                      "datatype": "cases",
                      "colour": "rgb(178,24,43)"
                  },
                  "geometry": {"type": "Point", "coordinates": [-0.30174587349631565, 51.552182823098406]}
              },

              {
                  "type": "Feature",
                  "properties": {
                      "Borough": "Brent",
                      "description": "London Borough of Brent",
                      "value": 7,
                      "datatype": "cases",
                      "colour": "rgb(178,24,43)"
                  },
                  "geometry": {"type": "Point", "coordinates": [-0.011583929705352602, 51.463692453353815]}
              },
              {
                  "type": "Feature",
                  "properties": {
                      "Borough": "Brent",
                      "description": "London Borough of Brent",
                      "value": 6,
                      "datatype": "cases",
                      "colour": "rgb(178,24,43)"
                  },
                  "geometry": {"type": "Point", "coordinates": [-0.030458421517778334, 51.388296156862964]}
              },
              {
                  "type": "Feature",
                  "properties": {
                      "Borough": "Brent",
                      "description": "London Borough of Brent",
                      "value": 3.2,
                      "datatype": "cases",
                      "colour": "rgb(178,24,43)"
                  },
                  "geometry": {"type": "Point", "coordinates": [-0.019, 51.57993972933622]}
              }

          ]
      };*/

    //Map properties
    const mBToken = 'pk.eyJ1IjoidHdpbmUxMmIiLCJhIjoiY2ttZ3hwdmJrMDF4MTJwbXRkNXN2eGExYSJ9.3BXNyT_qhst6zu9BparHGg';
    const minZoomForCircle = 7;
    const maxZoomForCircle = 16;
    const valueRangeBottom = 7900;//todo pass from datanormaliser
    const valueRangeTop = 34000;//todo pass from datanormaliser
    const minZoomCircleRadiusBottom = 1;
    const minZoomCircleRadiusTop = 4;

    const maxZoomCircleRadiusBottom = 5;
    const maxZoomCircleRadiusTop = 50;


    useEffect(() => {
        //GET request
        axios.get('http://localhost:8080/mapinfo/furlough/')
            // if promise resolves ,update state
            .then(response => {
                console.log(response);
                mapData = response.data;
                localStorage.setItem("apiData", JSON.stringify(response.data));
            })
            //if error ,log and show default data
            .catch(err => console.log(err))


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

                /*  map.addSource('ubicov2', {
                      type: 'geojson',
                      data: mapData2
                  });
  */

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
                                ['interpolate', ['linear'], ['get', 'value'], valueRangeBottom, minZoomCircleRadiusBottom, valueRangeTop, minZoomCircleRadiusTop],
                                maxZoomForCircle,
                                ['interpolate', ['linear'], ['get', 'value'], valueRangeBottom, maxZoomCircleRadiusBottom, valueRangeTop, maxZoomCircleRadiusTop]
                            ],
                            // Color circle from feature properties
                            'circle-color': ['get', 'colour'],
                            'circle-stroke-color': 'black',
                            'circle-stroke-width': 1,
                            // circle opacity between 0-1 different for two data sets to show through
                            'circle-opacity': 0.8

                        }
                    }
                );
                /* map.addLayer(
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
                                 ['interpolate', ['linear'], ['get', 'value'], valueRangeBottom, minZoomCircleRadiusBottom, valueRangeTop, minZoomCircleRadiusTop],
                                 maxZoomForCircle,
                                 ['interpolate', ['linear'], ['get', 'value'], valueRangeBottom, maxZoomCircleRadiusBottom, valueRangeTop, maxZoomCircleRadiusTop]
                             ],
                             // Color circle from feature properties
                             'circle-color': ['get', 'colour'],
                             'circle-stroke-color': 'black',
                             'circle-stroke-width': 1,
                             // circle opacity between 0-1 different for two data sets to show through
                             'circle-opacity':0.6

                         }
                     }
                 );*/

                setMap(map);
                map.resize();
            });
        };

        if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);//TODO pass empty dependency list instead of map?


    return <div ref={el => (mapContainer.current = el)} style={styles}>
        {/* <Layer {...parkLayer} paint={{ 'fill-color': parkColor }} /> */}
    </div>;
};


export default MapboxGLMap;