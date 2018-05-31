import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order/order.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {
      label: 'Dinheiro',
      value: 'MON'
    }, {
      label: 'Cartão de Debito',
      value: 'DEB',
    }, {
      label: 'Cartão de Refeição',
      value: 'REF'
    }
  ]

  constructor(private orderService: OrderService, private router: Router,private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formbuilder.group({
      name: this.formbuilder.control(''),
      email: this.formbuilder.control(''),
      emailConfirmation: this.formbuilder.control(''),
      address: this.formbuilder.control(''),
      number: this.formbuilder.control(''),
      optionalAddress: this.formbuilder.control(''),
      paymentOption: this.formbuilder.control('')
    })
  }

  itemsValue():number{
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item :CartItem){
    this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    this.orderService.remove(item)
  }

  checkOrder(order: Order){
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity,item.menuItem.id))
    this.orderService.checkOrder(order).subscribe((orderId: string) =>{
        this.router.navigate(['/order-sumary'])
        this.orderService.clear()
    })
  }


}
