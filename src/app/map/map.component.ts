import { Component } from '@angular/core';
import { MarkerManager, AgmDataLayer,AgmMarker, } from '@agm/core';
import {Http} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import { } from '@types/googlemaps';
@Component({
    selector: 'mt-mapa',
    templateUrl: 'map.component.html',
})
export class MapComponent {
    constructor(private http: Http){
    }
    title: string = 'My first AGM project';
    lat: number = 51.678418;
    lng: number = 7.809007;

    onClickMap(event){
        console.log(event)
    }
}