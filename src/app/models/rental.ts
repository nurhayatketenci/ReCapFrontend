export interface Rental{
    rentId:number;
    carId:number;
    customerId:number;
    rentDate:Date;
    rentStartDate:Date;
    rentEndDate?:Date;
    returnDate?:Date;
}