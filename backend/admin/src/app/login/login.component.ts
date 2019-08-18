import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import {LoginService} from '../services/login.service';
import * as jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
 myForm:FormGroup;
 resData;
 tokenData;
 eMsg;
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService,
    private fb:FormBuilder,private lser:LoginService,private cookieService: CookieService,private router: Router) {
    this.myForm=fb.group(
      {
        'email':['',Validators.required],
        'password':['',Validators.required]
      }
    )
   }
 Login(data)
 {
  this.lser.adminLogin(data)
  .subscribe(res=>
  {
    this.resData=res;
    if(this.resData.err==0){
    //console.log(jwt_decode(this.resData.token))
    this.tokenData=jwt_decode(this.resData.token);
    this.storage.set('token',this.resData);
    this.cookieService.set('uid',this.tokenData.ulogin);
    this.router.navigate(['/dashboard']);
    }
    else{
      this.eMsg=this.resData.msg;
    }
  })
 }
  ngOnInit() 
  {
  }
}
