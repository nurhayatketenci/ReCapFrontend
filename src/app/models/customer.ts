export interface Customer{
    cUsersId:number
    companyName:string
    findexPuan:number
}
export interface CustomerDetail extends Customer{
    findexPuan:number
    firstName:string;
    lastName:string;
}