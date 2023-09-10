import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './layout/menu/menu.component';
import {NgIf} from "@angular/common";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './layout/header/header.component';
import { CustomerComponent } from './page/customer/customer.component';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import { TablePaginationComponent } from './components/material/table-pagination/table-pagination.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PipesModule} from "./pipes/pipes.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    CustomerComponent,
    TablePaginationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgIf,
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatTableModule,
        MatCheckboxModule,
        PipesModule,
        MatPaginatorModule,
        MatSortModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
