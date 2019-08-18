import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';
@Injectable()
export class CategoryService {
 url="http://localhost:8888/api/"
  constructor(private http:HttpClient) { }
  addCat(data)
  {
  	 return this.http.post(this.url+'addcat',data)
  }
  fetchCat()
  {
  	return this.http.get(this.url+'fetchcat')
  }
  delCat(val)
  {
  	return this.http.get(this.url+'delCat/'+val)
  }
addNews(data)
  {
     return this.http.post(this.url+'addnews',data)
  }
  fetchNews()
  {
    return this.http.get(this.url+'fetchnews')
  }
   delNews(val)
  {
    return this.http.get(this.url+'delNews/'+val)
  }
}