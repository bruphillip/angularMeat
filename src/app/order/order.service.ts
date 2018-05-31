import { Injectable } from "@angular/core";
import { ShoppingCartService } from "../restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "../restaurant-detail/shopping-cart/cart-item.model";
import { Http, Headers, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import { Order, OrderItem } from './order/order.model'
import { MEAT_API } from './../app.api'



@Injectable()
export class OrderService {

    constructor(private shoppingcart: ShoppingCartService, private http: Http) { }

    cartItems(): CartItem[] {
        return this.shoppingcart.items
    }

    increaseQty(item: CartItem) {
        this.shoppingcart.increaseQty(item)
    }

    decreaseQty(item: CartItem) {
        this.shoppingcart.decreaseQty(item)
    }

    remove(item: CartItem) {
        this.shoppingcart.removeItem(item)
    }

    itemsValue(): number {
        return this.shoppingcart.total()
    }

    checkOrder(order: Order): Observable<string> {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return this.http.post(`${MEAT_API}/orders`,
            JSON.stringify(order),
            new RequestOptions({ headers: headers }))
            .map(res => res.json())
            .map(order => order.id)
    }

    clear(){
        this.shoppingcart.clear()
    }
}