import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  apiUrl = 'https://localhost:44339/api/';

  constructor(private httpClient: HttpClient) {}

  addPayment(payment: Payment): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'payment/addpayment';
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }
  cardVerification(card: CreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'creditcards/check';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }
  registercreditcard(card: CreditCard): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'creditcards/registercreditcard';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }
  getCardById(cardId:number):Observable<SingleResponseModel<CreditCard>> {
    let newPath=this.apiUrl+'creditcards/getbyid?id='+cardId
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath)
  }
  getCards(): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + 'creditcards/getall';
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
}
