import { Injectable } from '@angular/core';
import { CartItem, CartItems } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(cartItem:CartItem){
      CartItems.push(cartItem);
  }

 

  list():CartItem[]{
    return CartItems;
  }

}