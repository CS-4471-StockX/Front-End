import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsModule } from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { fromEventPattern } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
