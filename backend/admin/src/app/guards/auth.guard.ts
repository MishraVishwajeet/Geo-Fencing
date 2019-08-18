import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private cook:CookieService,private router:Router)
	{
	}
  canActivate()
  {
  	if(this.cook.check('uid'))
  	{
    return true;
	}
	else
	{
		alert("Plz login first!!")
		this.router.navigate(['/'])
	}
  }
}