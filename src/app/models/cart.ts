export class CartItem {
    carId: number;
    customerId: number;
    rentDate: Date;
    returnDate: Date;
    rentStartDate: Date;
    rentEndDate: Date;
    brandName: string;
    colorName: string;
    modelYear: number;
    dailyPrice: number;
    totalPrice: number;
}

export const CartItems:CartItem[]=[];