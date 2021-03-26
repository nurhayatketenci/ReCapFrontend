import { Rental } from "./rental";

export class CartItem {
    rental:Rental;
    totalPrice:number;
}

export const CartItems:CartItem[]=[];