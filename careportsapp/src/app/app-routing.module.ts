import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { SupportActiveItemComponent } from './support-active-item/support-active-item.component';


const routes: Routes = [ 
	{ path: '', redirectTo: 'view-item', pathMatch: 'full' },
    { path: 'view-item', component: ItemListComponent },
    { path: 'support-active-item', component: SupportActiveItemComponent },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
