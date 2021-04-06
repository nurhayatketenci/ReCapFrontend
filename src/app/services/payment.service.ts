import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl = 'https://localhost:44339/api/';

  constructor(private httpClient: HttpClient) {}

  addPayment(payment: Payment): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'payment/addpayment';
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }
  cardVerification(card:CreditCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+'creditcart/check'
    return this.httpClient.post<ResponseModel>(newPath,card);
  }
}
