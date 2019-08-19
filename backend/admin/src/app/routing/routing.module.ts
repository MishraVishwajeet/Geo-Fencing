import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CategoryComponent } from '../dashboard/category/category.component';
import { NewsComponent } from '../dashboard/news/news.component';
import { ChangepassComponent } from '../dashboard/changepass/changepass.component';
import {AuthGuard} from '../guards/auth.guard';
import { AddcatComponent } from '../dashboard/category/addcat/addcat.component';
const routes:Routes=[
	{path:'',component:LoginComponent},
	{path:'dashboard',component:DashboardComponent,
  canActivate:[AuthGuard],
children:[
    {path:'category',component:CategoryComponent},
    {path:'news',component:NewsComponent},
    {path:'changepass',component:ChangepassComponent},
    {path:'category/addcat/:id',component:AddcatComponent}
          ]}
];
@NgModule({
  imports: [
    CommonModule,RouterModule.forRoot(routes)
  ],
  //declarations: [LoginComponent],
  exports:[RouterModule]
})
export class RoutingModule { }
