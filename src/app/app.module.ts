import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ListItemsComponent } from './list-items/list-items.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "./modules/layout/layout.module";

@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    ItemDetailsComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        LayoutModule.forRoot({
          maxSearchLength: 3,
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
