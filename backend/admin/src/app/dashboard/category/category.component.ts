import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service'
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private cser:CategoryService,private router: Router) { }
  cdata;
  catData;
  x=[]
  addcat(val){
  this.router.navigate(['dashboard/category/addcat',val]);
  }
  delCat(val){
  	this.cser.delCat(val)
  	.subscribe(res=>
  	{
  		console.log(res);
  	})
    //this.fetchCat();
  }
  fetchCat(){
    this.cser.fetchCat()
    .subscribe(res=>
    {
      console.log(res);
      this.cdata=res;
      if(this.cdata.status==200){
        this.catData=this.cdata.cData.devices;
        for(var idx in this.catData) {
          var item = this.catData[idx];
          this.x.push(item);
          
        }
      }
    })
  }
  ngOnInit() {
  	this.fetchCat();
  }

}
