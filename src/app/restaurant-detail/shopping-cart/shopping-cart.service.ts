import { Injectable } from '@angular/core';
import {CartItem} from './cart-item.model'
import {MenuItem} from '../menu-item/menu-item.model'
import { CartModel } from './cart-model.model'

export class ShoppingCartService {

    items: CartItem[] = []
    
    constructor(){
        let listItem = JSON.parse(localStorage.getItem('shoppingCart'))
        if (!listItem)
            return null
        for(let list of listItem){
                this.items.push(new CartItem(list['menuItem'], list['quantity']))
        }
     }

    clear(){
        localStorage.removeItem("shoppingCart");
        this.items = []
    }
 
    addItem(item:MenuItem){
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        if(foundItem){
            this.increaseQty(foundItem)
        }else{
            this.items.push(new CartItem(item))
        }
        localStorage.setItem('shoppingCart',JSON.stringify(this.items))
    }

    removeItem(item:CartItem){
        this.items.splice(this.items.indexOf(item),1)
        localStorage.removeItem("shoppingCart");
        // localStorage.setItem('shoppingCart',JSON.stringify(this.items))
    }

    total(): number{
        return this.items.map(item => item.value()).reduce((prev,value) => prev+value,0)
    }

    increaseQty(item: CartItem){
        let found =  this.items.map( (i)  => {
            if(i.menuItem.id === item.menuItem.id){
                i.quantity = i.quantity+1
            }
        })
        localStorage.setItem('shoppingCart',JSON.stringify(this.items))
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity-1
        if (item.quantity === 0){
            this.removeItem(item)
        }
    }
}