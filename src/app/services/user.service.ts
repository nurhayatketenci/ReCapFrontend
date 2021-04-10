import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl="https://localhost:44339/api/"
  constructor(private httpClient:HttpClient) { }

  userUpdate(user:User):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"users/update",user)
  }
  getUserById(id:number):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"users/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getUserByEmail(email:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"users/getbyemail?email="+email
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  
}
