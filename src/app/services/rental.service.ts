import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  
  apiUrl = 'https://localhost:44339/api/';
  rent:Rental

  private data = new BehaviorSubject<number>(0);
  cartSummary = this.data.asObservable();
  constructor(private httpClient: HttpClient) {}

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/RentalDetailDto';
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
  }

  getRentalByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getrentalbycar?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'rentals/add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getRentalById(rentId: number): Observable<SingleResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/getbycarid?rentId=' + rentId;
    return this.httpClient.get<SingleResponseModel<Rental>>(newPath);
  }
 
}
