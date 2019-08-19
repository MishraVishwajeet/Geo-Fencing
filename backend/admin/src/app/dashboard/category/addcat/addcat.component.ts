import { Component, OnInit,NgZone } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { CategoryService} from '../../../services/category.service';
import {Router} from  '@angular/router';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.component.html',
  styleUrls: ['./addcat.component.css']
})
export class AddcatComponent implements OnInit {
	myForm:FormGroup;
  iImage;
  cname;
  ndata;
  natData;
  constructor(private route: ActivatedRoute,private fb:FormBuilder,private ser:CategoryService,private router:Router,private ngZone: NgZone) {
  this.myForm=fb.group(
  	{
  		'cname':['',Validators.required],
      'image':null
  	}
  )
 }
  ngOnInit() {

  }
  addNews(data){
    let formdata=new FormData();
     formdata.append('cname',data.cname)
     //formdata.append('image',this.iImage)
     //formdata.append('titl',data.titl)
     //formdata.append('des',data.des)
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
