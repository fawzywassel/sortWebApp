import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListItemsComponent} from "./list-items/list-items.component";
import {ItemDetailsComponent} from "./item-details/item-details.component";

const routes: Routes = [
  { path: 'films',  component: ListItemsComponent},
  { path: 'films/:id',  component: ItemDetailsComponent},

  { path: 'people',  component: ListItemsComponent},
  { path: 'people/:id',  component: ItemDetailsComponent},

  { path: 'planets',  component: ListItemsComponent},
  { path: 'planets/:id',  component: ItemDetailsComponent},

  { path: 'species',  component: ListItemsComponent},
  { path: 'species/:id',  component: ItemDetailsComponent},

  { path: 'starships',  component: ListItemsComponent},
  { path: 'starships/:id',  component: ItemDetailsComponent},

  { path: 'vehicles',  component: ListItemsComponent},
  { path: 'vehicles/:id',  component: ItemDetailsComponent},


  { path: '**',  redirectTo :"films"},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
