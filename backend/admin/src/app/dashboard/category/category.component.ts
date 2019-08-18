import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private cser:CategoryService) { }
  cdata;
  catData;
  delCat(val){
  	this.cser.delCat(val)
  	.subscribe(res=>
  	{
  		console.log(res);
  	})
    this.fetchCat();
  }
  fetchCat(){
    this.cser.fetchCat()
    .subscribe(res=>
    {
      console.log(res);
      this.cdata=res;
      if(this.cdata.status==200){
        this.catData=this.cdata.cData;
      }
    })
  }
  ngOnInit() {
  	this.fetchCat();
  }

}
