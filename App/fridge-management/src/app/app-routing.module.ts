import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FridgeListComponent } from './fridge-list/fridge-list.component';
import { FridgeDetailsComponent } from './fridge-details/fridge-details.component';
import { FridgeAddComponent } from './fridge-add/fridge-add.component';
import { FridgeEditComponent } from './fridge-edit/fridge-edit.component';
import { FridgeStatsComponent } from './fridge-stats/fridge-stats.component';
import { FridgeSearchComponent } from './fridge-search/fridge-search.component';
import { FridgeComponent } from './fridge/fridge.component';
import { FridgeShoppinglistComponent } from './fridge-shoppinglist/fridge-shoppinglist.component';
import { FridgeProfileComponent } from './fridge-profile/fridge-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/fridge', pathMatch: 'full' },
  { path: 'fridge', component: FridgeComponent },
  { path: 'fridge/list', component: FridgeListComponent },
  { path: 'fridge/list/detail/:id', component: FridgeDetailsComponent },
  { path: 'fridge/add', component: FridgeAddComponent },
  { path: 'fridge/stats', component: FridgeStatsComponent },
  { path: 'fridge/search', component: FridgeSearchComponent },
  { path: 'fridge/shoppinglist', component: FridgeShoppinglistComponent }, 
  { path: 'fridge/profile', component: FridgeProfileComponent },
  { path: 'fridge/edit/:id', component: FridgeEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
