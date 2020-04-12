import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { SupportActiveItemComponent } from './components/support-active-item/support-active-item.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SupportAllItemComponent } from './components/support-all-item/support-all-item.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarModule } from 'primeng/calendar';
import { DevAllItemComponent } from './components/dev-all-item/dev-all-item.component';
import { DevSprintComponent } from './components/dev-sprint/dev-sprint.component';
import { DevDailyScrumComponent } from './components/dev-daily-scrum/dev-daily-scrum.component';
import { ReleaseItemComponent } from './components/release-item/release-item.component';
import { TaskSchedulerComponent } from './components/task-scheduler/task-scheduler.component';
import { AngularTreeGridModule } from 'angular-tree-grid';
import { CurrentSprintComponent } from './components/current-sprint/current-sprint.component';

@NgModule({
  declarations: [
    AppComponent,
    SupportActiveItemComponent,
    SupportAllItemComponent,
    DashboardComponent,
    DevAllItemComponent,
    DevSprintComponent,
    DevDailyScrumComponent,
    ReleaseItemComponent,
    TaskSchedulerComponent,
    CurrentSprintComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    CalendarModule,
    AngularTreeGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
