import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, CustomerDetail } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  apiUrl = "https://localhost:44339/api/customers/"

  constructor(private httpClient: HttpClient) { }

  getCustomer(): Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + "getall");
  }

  getCustomerDetails(): Observable<ListResponseModel<CustomerDetail>> {
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(this.apiUrl + "getcustomerdetails");
  }
}