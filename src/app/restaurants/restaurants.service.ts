import {Injectable} from '@angular/core'
import {Http} from '@angular/http'
import {Restaurant} from "./restaurant/restaurant.model"
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {MEAT_API} from '../app.api'
import {Observable} from 'rxjs/Observable'
import {ErrorHandler} from '../app.error-handler'

@Injectable()
export class RestaurantsService{
   
    constructor(private http: Http){}
    
    Restaurants(): Observable<Restaurant[]>{
        return this.http.get(`${MEAT_API}/restaurants`).map(response => response.json())
            .catch(ErrorHandler.handleError)
            
    }
}