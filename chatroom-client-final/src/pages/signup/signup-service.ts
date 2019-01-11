import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {

  constructor(private _http: HttpClient) { }

  //adding new user
  addUser(newUser){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
  
    return this._http.post('http://localhost:3000/api/user', newUser, {headers: headers});
  }

}