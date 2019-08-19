import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RoutingModule} from './routing/routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
import { StorageServiceModule } from 'angular-webstorage-service';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './dashboard/category/category.component';
import { NewsComponent } from './dashboard/news/news.component';
import { ChangepassComponent } from './dashboard/changepass/changepass.component';
import {AuthGuard} from './guards/auth.guard';
import { AddcatComponent } from './dashboard/category/addcat/addcat.component';
import{ CategoryService } from './services/category.service';
import { MyformValidator } from './dashboard/changepass/Myform.validator';
import { PhoneNoComponent } from './dashboard/category/phone-no/phone-no.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CategoryComponent,
    NewsComponent,
    ChangepassComponent,
    AddcatComponent,
    PhoneNoComponent
  ],
  imports: [
    BrowserModule,RoutingModule,ReactiveFormsModule,HttpClientModule,StorageServiceModule
  ],
  providers: [LoginService,CookieService,AuthGuard,CategoryService,MyformValidator],
  bootstrap: [AppComponent]
})
export class AppModule { }
 