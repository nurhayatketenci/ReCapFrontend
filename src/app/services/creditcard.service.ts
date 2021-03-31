import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditcardService {
  apiUrl="https://localhost:44339/api/";

  constructor(private httpClient:HttpClient) { }
  getCardbyid(cardNumber:number):Observable<SingleResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditcart/check?cardNumber="+cardNumber
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newPath);
   }

    
  }


