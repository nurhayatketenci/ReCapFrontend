import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cUsersId:number
  cartItems:CartItem[]=[];
  dataLoaded = false;
  cartTotal:number;

  constructor(
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem)
  }

  getCart(){
    this.cartItems = this.cartService.cartList();
    this.cUsersId = this.cartItems[0].customerId;
    this.cartService.data.subscribe(response => {
      this.cartTotal = response;
    });

    this.dataLoaded = true;    
  }

}
