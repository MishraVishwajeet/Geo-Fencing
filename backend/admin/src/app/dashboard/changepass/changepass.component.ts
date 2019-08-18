import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder} from '@angular/forms';
import { ChangepassService } from '../../services/changepass.service';
import { CookieService } from 'ngx-cookie-service';
import { MyformValidator } from './Myform.validator';
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
myForm:FormGroup;
passwordFormGroup:FormGroup;
resData;
eMsg;
cLogin;
a;
  constructor(private fb:FormBuilder,private cser:ChangepassService,private cook:CookieService) {
this.passwordFormGroup = this.fb.group({
      'newpass': ['', Validators.required],
      'cnfpass': ['', Validators.required]
    }, {
      validator: MyformValidator.validate.bind(this)
    });
    this.myForm = this.fb.group({
      'oldpass': ['', Validators.required],
      passwordFormGroup: this.passwordFormGroup
    });
   } 
Check(data)
{
  this.a={data:data,cLogin:this.cLogin};
	this.cser.changePass(this.a)
	.subscribe(res=>
	{
		this.resData=res;
		if(this.resData.err==0){
			console.log(this.resData);
		}
		else{
			this.eMsg=this.resData.msg;
		}
	})
}
  ngOnInit() 
  {
  	this.cLogin=this.cook.get('uid');
    //console.log(this.cLogin);
  }

}
