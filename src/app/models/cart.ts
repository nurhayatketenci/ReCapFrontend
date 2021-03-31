import { Rental } from "./rental";

export class CartItem {
    carId: number;
    cUsersId: number;
    rentDate: Date;
    returnDate: Date;
    brandName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    totalPrice: number;
}

export const CartItems:CartItem[]=[];