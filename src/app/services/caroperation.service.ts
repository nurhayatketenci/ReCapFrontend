import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CaroperationService {
  apiUrl="https://localhost:44339/api/"
  constructor(private httpClient:HttpClient) { }
  getCarById(id: number): Observable<SingleResponseModel<Car>> {
    let newPath: string = this.apiUrl + 'cars/getbyid?carId=' + id;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
 }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
    }
    updateCar(car:CarDetailDto):Observable<SingleResponseModel<Car>>{ 
      return this.httpClient.post<SingleResponseModel<Car>>(this.apiUrl+"cars/update",car)
      }
}
