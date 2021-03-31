import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44339/api/"
  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<ListResponseModel<Brand>>{
   return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"brands/getall");
   }
   addBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"brands/add",brand)
    }
    updateBrand(brand:Brand):Observable<ListResponseModel<Brand>>{ 
    return this.httpClient.post<ListResponseModel<Brand>>(this.apiUrl+"brands/update",brand)
    }
    getBrandById(brandId:number):Observable<SingleResponseModel<Brand>> {
      return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl+"brands/getbyid?id="+brandId);
    }
    deleteBrand(brand:Brand):Observable<ListResponseModel<Brand>>{ 
      return this.httpClient.post<ListResponseModel<Brand>>(this.apiUrl+"brands/delete",brand)
      }
}
