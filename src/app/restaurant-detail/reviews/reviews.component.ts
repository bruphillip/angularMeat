import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {RestaurantsService} from '../../restaurants/restaurants.service'
import {Observable} from 'rxjs/Observable'

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any> 
  constructor(private RestaurantsService: RestaurantsService,
  private router: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.RestaurantsService.reviewsOfRestaurant(this.router.parent.snapshot.params['id'])
  }

}
