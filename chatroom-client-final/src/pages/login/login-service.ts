import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  constructor(private _http: HttpClient) { }

  //getting user for name and password
  getUser(username){
  
    return this._http.get('http://localhost:3000/api/user/'+username);
  }


}