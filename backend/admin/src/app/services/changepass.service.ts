import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChangepassService {
url="http://localhost:8888/api/"
  constructor(private http:HttpClient) { }
  changePass(a){
  	return this.http.post(this.url+'changePass',a)
  }
}
