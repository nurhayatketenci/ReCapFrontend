import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Findeks } from '../models/findeks';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {
  apiUrl="https://localhost:44339/api/"
  constructor(private httpClient:HttpClient) { }
 
  getByCustomerId(customerId: number): Observable<SingleResponseModel<Findeks>> {
    return this.httpClient.get<SingleResponseModel<Findeks>>(this.apiUrl+"getbycustomerid",
      {
        params: {
          customerId: customerId.toString(),
        },
      }
    );
}
}
