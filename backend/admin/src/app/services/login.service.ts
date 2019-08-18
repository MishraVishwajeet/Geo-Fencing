import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {
url="http://localhost:8888/api/"
  constructor(private http:HttpClient) { }
  adminLogin(data)
  {
    return this.http.post(this.url+"adminLogin",data)
  }
}
