import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from  '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cLogin;	
  constructor(private cook:CookieService,private router:Router) { }

  ngOnInit() 
  {
  	this.cLogin=this.cook.get('uid');
  }
  Logout()
  {
  	this.cook.delete('uid');
  	this.router.navigate(['/'])
  }

}
