///////customer.module.ts


import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import{Route, RouterModule}from'@angular/router';

const ROUTES:Route[]=[{path:"",component:CustomerComponent}];


@NgModule({
    imports:[RouterModule.forChild(ROUTES)],
    declarations:[CustomerComponent]
})

export class CustomerModule{}



///////customer.component.ts

import { Component } from '@angular/core';

@Component({
    selector:'app-customer',
    template:'<h1>Customer Component</h1>'
})


export class CustomerComponent{}



///////header component.ts


import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../userlist/user.service';

@Component({
  selector: 'app-header',
  template: `
  "<header class="container">
  <nav class="navbar navbar-expand-lg bg-dark" >
  <h3 class ="navbar-brand">My Products app</h3>
<ul class ="navbar-nav mr-auto">
<li class ="nav-item"><a class="nav-link" routerLink="/">Home</a><li>
<li class ="nav-item"><a class="nav-link" routerLink="/about" >About</a><li>
<li class ="nav-item"><a class="nav-link" routerLink="/products" >Products</a><li>
<li class ="nav-item"><a class="nav-link" routerLink="/contact" >Contact</a><li>
<li class ="nav-item"><a class="nav-link" routerLink="/customers" >Customers</a><li>
</ul>
<button *ngIf="!isAuthenticated" routerLink="/login" class="btn-sm btn-success">Login</button>
&nbsp;
<button *ngIf="isAuthenticated" class="btn-sm btn-success" (click)="onLogout()">Logout</button>
</nav>
</header>

  `
})
export class HeaderComponent {

isAuthenticated:boolean;
  constructor(private router:Router,private userSvc: userService){
this.userSvc.isAuthenticated.subscribe(val=>this.isAuthenticated=val);
  }

onLogout(){

 this.userSvc.onLogout()
this.router.navigate(['/login']);
}

}



///////routing.module.ts

import { NgModule, Component } from '@angular/core';
import { RouterModule, Route} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { NewProductComponent } from '../services/new-product/new-product.component';
import { RecativeFormComponent } from '../reactive-form/reactive-form.component';
import { LoginComponent } from '../userlist/login/login.component';
import { ProductRouteGaruds } from '../services/route.garuds';
import { ProductResolver } from '../services/product.resolver';

const CHILD_ROUTES:Route[]=[
    
]

const ROUTES=[{path: '', component:HomeComponent},
{path:'about', component:AboutComponent},
{path:'contact', component:ContactComponent},
{path:'products', component:ProductListComponent,resolve:{products:ProductResolver}, canActivate:[ProductRouteGaruds]},
{path:'login',component:LoginComponent},
{path:'products/new',component:NewProductComponent,canDeactivate:[ProductRouteGaruds]},
{path:'products/reactive-form',component:RecativeFormComponent},
{path:'products/:id',component:ProductDetailComponent, canActivateChild:[ProductRouteGaruds], children:CHILD_ROUTES},
{path :'customers',loadChildren:'src/app/lazy/customer.module#CustomerModule'},
{path:'**', redirectTo:''}];


@NgModule({
imports:[ RouterModule.forRoot(ROUTES)],
providers:[ProductRouteGaruds,ProductResolver],
exports :[RouterModule]
})

export class RoutingModule{}







