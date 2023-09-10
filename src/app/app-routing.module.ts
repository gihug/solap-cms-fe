import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuComponent} from "./layout/menu/menu.component";
import {CustomerComponent} from "./page/customer/customer.component";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path:'customer',
        component: CustomerComponent
      }
    ]
  },
  {
    path: '**',
    component: CustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
