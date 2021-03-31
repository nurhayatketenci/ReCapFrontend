import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, CartItems } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl="https://localhost:44339/api/";
  private data = new BehaviorSubject<number>(0)
  cartSummary = this.data.asObservable()
  constructor() { }
  addToCart(cartItem:CartItem){
    CartItems.push(cartItem)
}


calculateCart(cartItem:CartItem[]){
  let total = cartItem.reduce((acc, val) => acc += val.totalPrice, 0)
  this.data.next(total)
}

cartList():CartItem[]{
  return CartItems
}
}
