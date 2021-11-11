import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { fromEventPattern } from 'rxjs';
import { StockTrackerSearchComponent } from './stock-tracker-search/stock-tracker-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockTrackerComponent,
    StockTrackerSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
