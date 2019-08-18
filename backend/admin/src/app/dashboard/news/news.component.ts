import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { CategoryService} from '../../services/category.service';
import {Router} from  '@angular/router';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
myForm:FormGroup;
  iImage;
  cdata;
  catData;
  ndata;
  natData;

  constructor(private fb:FormBuilder,private ser:CategoryService,private router:Router) {
this.myForm=fb.group(
  	{	
  		'titl':['',Validators.required],
      'des':['',Validators.required],
  		'cname':['',Validators.required],
      'image':null,
  	}
  )
 }
delNews(val){
    this.ser.delNews(val)
    .subscribe(res=>
    {
      console.log(res);
    })
    this.fetchNews();
  }
  ngOnInit() {
  	this.fetchNews();
  	this.ser.fetchCat()
    .subscribe(res=>
    {
      console.log(res);
      this.cdata=res;
      if(this.cdata.status==200){
        this.catData=this.cdata.cData;
      }
    })
}

  addNews(data){
    let formdata=new FormData();
     formdata.append('cname',data.cname)
     formdata.append('image',this.iImage)
     formdata.append('titl',data.titl)
     formdata.append('des',data.des)
  		this.ser.addNews(formdata)
  		.subscribe(res=>{
  		})
      this.router.navigate(['/dashboard/news']);
      console.log("hello");
      this.fetchNews();
      this.fetchNews();
      this.fetchNews();
  }
  fetchNews(){
  	this.ser.fetchNews() 
    .subscribe(res=>
    {
      console.log(res);
      this.ndata=res;
      if(this.ndata.status==200){
        this.natData=this.ndata.nData;
      }
    })
  }
      
  myImage(event)
  {
    //if(event.target.files && event.target.files>0){
      this.iImage=event.target.files[0];
     this.myForm.get('image').setValue(this.iImage);
    //}
  }

}

