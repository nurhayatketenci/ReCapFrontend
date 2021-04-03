import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartItems } from '../models/cart';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  apiUrl = 'https://localhost:44339/api/';

  private dataSource = new BehaviorSubject<number>(0);
  data = this.dataSource.asObservable();

  constructor() {}

  addToCart(cartItem: CartItem) {
    CartItems.push(cartItem);
    this.calculateCart()
  }
  
  removeFromCart(cartItem:CartItem){
    let item:CartItem = CartItems.find(c=>c.carId===cartItem.carId)
    CartItems.splice(CartItems.indexOf(item),1)
    this.calculateCart()
  }
  
  calculateCart() {
    let total = CartItems.reduce((acc, val) => (acc += val.totalPrice), 0);
    this.dataSource.next(total);
  }

  cartList(): CartItem[] {
    return CartItems;
  }
}
