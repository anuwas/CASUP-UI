import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SupportAllItemComponent } from './support-all-item/support-all-item.component';
import { SupportActiveItemComponent } from './support-active-item/support-active-item.component';


const routes: Routes = [ 
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
    { path: 'view-item', component: SupportAllItemComponent },
    { path: 'support-active-item', component: SupportActiveItemComponent },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
