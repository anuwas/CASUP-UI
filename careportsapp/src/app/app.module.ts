import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemListComponent } from './item-list/item-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SupportActiveItemComponent } from './support-active-item/support-active-item.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SupportAllItemComponent } from './support-all-item/support-all-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    SupportActiveItemComponent,
    SupportAllItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SmartTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
