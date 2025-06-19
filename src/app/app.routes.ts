import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ProductComponent} from './product/product.component';
import {ProductCategoryComponent} from './product-category/product-category.component';




export const routes: Routes = [

  {path:"", component: HomeComponent},
  {path:"products", component:ProductComponent},
  {path:"productcategories", component:ProductCategoryComponent},
];
