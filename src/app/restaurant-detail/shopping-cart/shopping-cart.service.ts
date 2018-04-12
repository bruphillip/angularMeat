import { Injectable } from '@angular/core';
import {CartItem} from './cart-item.model'
import {MenuItem} from '../menu-item/menu-item.model'
import { CartModel } from './cart-model.model'

export class ShoppingCartService {

    items: CartItem[] = []
    
    constructor(){
        let listItem = JSON.parse(localStorage.getItem('myName'))
        console.log(listItem)
        for(let list of listItem){
                this.items.push(new CartItem(list['menuItem'], list['quantity']))
        }
     }

    clear(){
        this.items = []
    }
 
    addItem(item:MenuItem){
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        if(foundItem){
            foundItem.quantity = foundItem.quantity +1
        }else{
            this.items.push(new CartItem(item))
            console.log(this.items)
        }
        localStorage.setItem('myName',JSON.stringify(this.items))
    }

    removeItem(item:CartItem){
        this.items.splice(this.items.indexOf(item),1)
    }

    total(): number{
        return this.items.map(item => item.value()).reduce((prev,value) => prev+value,0)
    }

}