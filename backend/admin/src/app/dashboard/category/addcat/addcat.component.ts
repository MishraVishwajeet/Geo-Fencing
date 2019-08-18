import { Component, OnInit,NgZone } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { CategoryService} from '../../../services/category.service';
import {Router} from  '@angular/router';
@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.component.html',
  styleUrls: ['./addcat.component.css']
})
export class AddcatComponent implements OnInit {
	myForm:FormGroup;
  iImage;
  cname;
  constructor(private fb:FormBuilder,private ser:CategoryService,private router:Router,private ngZone: NgZone) {
  this.myForm=fb.group(
  	{
  		'cname':['',Validators.required],
      'image':null
  	}
  )
 }
  ngOnInit() {

  }
  addCat(data){
    let formdata=new FormData();
     formdata.append('cname',data.cname)
     formdata.append('image',this.iImage)
  		this.ser.addCat(formdata)
  		.subscribe(res=>{
  		})
      this.ser.fetchCat();
      this.ser.fetchCat();
      this.ser.fetchCat();
      this.ser.fetchCat();
      this.router.navigate(['/dashboard/category']);
      this.ser.fetchCat();
      this.ser.fetchCat();
      this.ser.fetchCat();
      this.ser.fetchCat();
  }
      
  myImage(event)
  {
    //if(event.target.files && event.target.files>0){
      this.iImage=event.target.files[0];
     this.myForm.get('image').setValue(this.iImage);
    //}
  }

}
