import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SupportAllItemComponent } from './components/support-all-item/support-all-item.component';
import { SupportActiveItemComponent } from './components/support-active-item/support-active-item.component';
import { DevAllItemComponent } from './components/dev-all-item/dev-all-item.component';
import { ReleaseItemComponent } from './components/release-item/release-item.component';
import { TaskSchedulerComponent } from './components/task-scheduler/task-scheduler.component';
import { CurrentSprintComponent } from './components/current-sprint/current-sprint.component';


const routes: Routes = [ 
	{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
    { path: 'view-item', component: SupportAllItemComponent },
    { path: 'support-active-item', component: SupportActiveItemComponent },
    { path: 'dev-all-items', component: DevAllItemComponent },
    { path: 'release-all-items', component: ReleaseItemComponent },
    { path: 'all-scheduled-task', component: TaskSchedulerComponent },
    { path: 'current-sprint', component: CurrentSprintComponent },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
