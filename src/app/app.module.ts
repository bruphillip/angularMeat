import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ApplicationRef  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AgmCoreModule, MarkerManager, AgmDataLayer } from '@agm/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common'

import { ROUTES } from './app.route';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantsService } from './restaurants/restaurants.service';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { ShoppingCartService} from './restaurant-detail/shopping-cart/shopping-cart.service';
import { OrderComponent } from './order/order.component'
import { MapComponent } from './map/map.component'
import { olMapComponent } from './map/olMap/olMap.component'
import { FileSaver }  from 'file-saver'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RestaurantsComponent,
    RestaurantComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    RestaurantDetailComponent,
    ReviewsComponent,
    OrderComponent,
    MapComponent,
    olMapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDODA16CQeS1jLfuXBdvTIs10sh5GO5rTk'
    }),
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},RestaurantsService,ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
