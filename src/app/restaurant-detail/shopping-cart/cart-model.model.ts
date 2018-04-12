import {MenuItem} from '../menu-item/menu-item.model'

export class CartModel{
    constructor(public menuItem: MenuItem, public quantity: number = 1){

    }

    public value():number{
        return this.menuItem.price * this.quantity
    }
}