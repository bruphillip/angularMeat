import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from './shopping-cart.service' 
import {CartItem} from './cart-item.model'
import { MenuItem } from '../menu-item/menu-item.model'

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  constructor(private ShoppingCartService: ShoppingCartService ) {
   }

  ngOnInit() { }
  
  items(): CartItem[]{
    return this.ShoppingCartService.items;
  }
  total(): number{
    return this.ShoppingCartService.total()
  }
  clear(){
    localStorage.clear()
    this.ShoppingCartService.clear()
  }
  removeItem(item: CartItem){
    this.ShoppingCartService.removeItem(item)
  }
  addItem(item: MenuItem){
    this.ShoppingCartService.addItem(item)
  }
}
