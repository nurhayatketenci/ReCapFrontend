import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarimageService {
  apiUrl="https://localhost:44339/api/"

  constructor(private httpClient: HttpClient) { }

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getAllImages():Observable<ListResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(carImage:FormData):Observable<SingleResponseModel<CarImage>> {
    let newPath = this.apiUrl + "carimages/add";
    return this.httpClient.post<SingleResponseModel<CarImage>>(newPath, carImage );
  }
}
