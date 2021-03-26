import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44339/api/"
  constructor(private httpClient:HttpClient) { }
  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl+"rentals/RentalDetailDto"
   return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl);
   }
  getRentalByCar(car: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'rentals/get' + car;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  add(rental:Rental):Observable<ListResponseModel<CarDetailDto>> {
    let newPath=this.apiUrl+"rentals/add";
    return this.httpClient.post<ListResponseModel<CarDetailDto>>(newPath, rental);
  }

}
