import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import OlLayerVector from 'ol/layer/vector'
import OlVector from 'ol/source/vector'
import GeoJSON from 'ol/format/geojson'
import proj from 'ol/proj';
import BingMaps from 'ol/source/bingmaps';
import interaction from 'ol/interaction/select'
import { AgmMap, DataLayerManager , AgmDataLayer } from '@agm/core';
import {  } from '@types/googlemaps';
import { FileSaver }  from 'file-saver/FileSaver.js'
import { Grid_Fazenda } from '../api.Fazenda'
import { GoogleMap } from '@agm/core/services/google-maps-types';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';

@Component({
    selector: 'mt-ol',
    templateUrl: 'olMap.component.html',
})
export class olMapComponent {

    bing : BingMaps
    // gmap : google.maps.Map
    fileSaver : FileSaver
    map: OlMap;
    source: OlXYZ;
    layer: OlTileLayer;
    view: OlView;
    vector: OlVector;
    geo: GeoJSON;
    proj: proj;

    lat: number = 51.678418;
    lng: number = 7.809007;
    

    constructor() {
    }

    ngOnInit() {
        

        var json1 = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "teste": "algo",
                        "teste2": "a",
                        "teste3": "b"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -48.37829589843749,
                            -20.7098770198879
                        ]
                    }
                },
                {
                    "type": "Feature",
                    "properties": {
                        "teste": "asd",
                        "teste2": "2",
                        "teste3": "b"
                    },
                    "geometry": {
                        "type": "Point",
                        "coordinates": [
                            -49.37829589843749,
                            -20.7098770198879
                        ]
                    }
                }
            ]
        };

        // this.gmap = new google.maps.Map(document.getElementById('gmap'), {
        //     center: {lat: -34.397, lng: 150.644},
        //     zoom: 8
        //   });

        this.source = new OlXYZ({
            // Tiles from Mapbox (Light)
            // url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
        });

        this.layer = new OlTileLayer({
            source: new BingMaps({
                key: 'AgpsLqfhkIjIKvRqdLc_LkN_m31uYLf2Cx4YeFhilxSl5cNsNq9A8C-9W9m0V4mZ',
                imagerySet: 'Road'
            })
        });

        this.view = new OlView({
            center: OlProj.fromLonLat([6.661594, 50.433237]),
            zoom: 3,
        });

        let ign = new OlVector({
            features: (new GeoJSON()).readFeatures(Grid_Fazenda, { featureProjection: 'EPSG:3857' })
        })
        let vector = new OlLayerVector({
            id: 'europa',
            source: ign,
            style: new Style({
                stroke: new Stroke({
                    color: '#333',
                    width: 0.5
                })
            })
        })

        let points = new OlLayerVector({
            id : 'points',
            source : new OlVector({
                features: (new GeoJSON().readFeatures(json1, { featureProjection: 'EPSG:3857'}))
            })
        })

        let canvas = document.getElementById('map')
        this.map = new OlMap({
            target: canvas,
            layers: [this.layer, vector,points],
            view: this.view
        });
        // this.gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(canvas);
        // this.map.addLayer(vector)
        
        var selectSingleClick = new interaction();
        this.map.addInteraction(selectSingleClick);
        var selectedFeatures = selectSingleClick.getFeatures(points)
        selectedFeatures.on(['add', 'remove'], function () {
            var names = selectedFeatures.getArray().map(function (feature) {
                console.log(feature.get('teste'));
            });
        });
        
    }
    ngAfterViewInit() {

        // this.view.on('change:center', function () {
        //     console.log(this.getCenter());

        // });
        // this.view.on('change:resolution', function () {
        //     console.log(this.getZoom());
        // })
    }

    // setGmapCenter(event): void {
    //     this.view.setCenter(new OlProj.toLonLat([event.lng, event.lat], 'EPSG:4326'))
    // }
    // setGmapZoom(event): void {
    //     this.view.setZoom(event)
    // }
}