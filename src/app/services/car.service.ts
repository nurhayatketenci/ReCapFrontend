import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car';
import { CarDetailDto } from '../models/carDetailDto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  getCarDetails(carId: number) {
    throw new Error('Method not implemented.');
  }
  apiUrl="https://localhost:44339/api/"
  constructor(private httpClient:HttpClient) { }
  getCars():Observable<ListResponseModel<CarDetailDto>>{
    let newPath=this.apiUrl+"cars/CarDetailDto"
   return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
   }
   getCarsByBrand(brandId:number):Observable<ListResponseModel<CarDetailDto>>{
     
    let newPath=this.apiUrl+"cars/getbybrand?brandId="+brandId
        return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
    }
    getCarsByColor(colorId:number):Observable<ListResponseModel<CarDetailDto>>{
      let newPath=this.apiUrl+"cars/getbycolor?colorId="+colorId
          return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
      }
      getCarsBySelect(brandId:number, colorId:number):Observable<ListResponseModel<CarDetailDto>>{
        let newPath =this.apiUrl+"cars/getbyselected?brandId="+brandId+"&colorId="+colorId
        return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
      }
      getCarById(id: number): Observable<ListResponseModel<CarDetailDto>> {
        let newPath: string = this.apiUrl + 'cars/getcardetail?carId=' + id;
        return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
     }
     getCarDetailsByCarId(carId:number):Observable<ListResponseModel<CarDetailDto>>{
      let newPath = this.apiUrl + "cars/getcardetailbycarid?carId=" + carId;
      return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
    }
    getcarbybrandandcolorid(brandId:number,colorId:number):Observable<ListResponseModel<CarDetailDto>>{
      let newPath = this.apiUrl + "cars/filtercar?brandId=" + brandId + "&colorId=" + colorId
      return this.httpClient.get<ListResponseModel<CarDetailDto>>(newPath);
    }
    add(car:CarDetailDto):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car,)
    }
    updateCar(car:Car):Observable<SingleResponseModel<Car>>{ 
      return this.httpClient.post<SingleResponseModel<Car>>(this.apiUrl+"cars/update",car)
      }
      getCarUpdateById(carId:number):Observable<SingleResponseModel<Car>> {
        return this.httpClient.get<SingleResponseModel<Car>>(this.apiUrl+"cars/getbyid?id="+carId);
      }
    
}
