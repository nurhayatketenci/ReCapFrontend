import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44339/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private httpClient: HttpClient) {}

  register(RegisterModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'register',
      RegisterModel
    );
  }
  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'login',
      loginModel
    );
  }
  handleToken(token: string) {
    let encodedToken = token;
    this.decodedToken = this.jwtHelper.decodeToken(encodedToken);
    console.log(this.decodedToken);
  }
  getName() {
   return this.decodedToken[
     'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
 
    ]
  }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
