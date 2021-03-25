import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44339/api/"
  constructor(private httpClient:HttpClient) { }
  getCars():Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"cars/CarDetailDto"
   return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
   }
   getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetailDto>>{
     
    let newPath=this.apiUrl+"cars/getbybrand?brandId="+brandId
    console.log(newPath);
        return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
    }
    getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetailDto>>{
      let newPath=this.apiUrl+"cars/getbycolor?colorId="+colorId
          return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
      }
      getCarsBySelect(brandId:number, colorId:number):Observable<ListResponseModel<CarDetailDto>>{
        let newPath =environment.production + "cars/getbyselected?brandId="+brandId+"&colorId="+colorId
        return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
      }
      getCarById(id: number): Observable<ListResponseModel<CarDetailDto>> {
        let newPath: string = this.apiUrl + 'getcardetail?id=' + id;
        return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
     }
     getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetailDto>>{
      let newPath = this.apiUrl + "cars/getbyid?carId=" + carId;
      return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
    }
    getcarbybrandandcolorid(brandId:number,colorId:number):Observable<ListResponseModel<CarDetailDto>>{
      let newPath = this.apiUrl + "cars/filtercar?brandId=" + brandId + "&colorId=" + colorId
      return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
    }
}
