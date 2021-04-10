import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44339/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  constructor(private httpClient: HttpClient) {}

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'register',
      registerModel
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
   
  }
  getName() {
    let token:string=localStorage.getItem("token")
    if (token) {
      let decoded = this.jwtHelper.decodeToken(token)
      let userName = Object.keys(decoded).filter(x => x.endsWith("/name"))[0];
      return decoded[userName];
    }
    return null
        
  }
  update(user: User): Observable<SingleResponseModel<TokenModel>> {
    let updatePath = this.apiUrl + 'update';
    return this.httpClient.put<SingleResponseModel<TokenModel>>(updatePath, user);
 }
  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
