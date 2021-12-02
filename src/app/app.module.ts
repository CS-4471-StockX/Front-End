import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ChartsModule } from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { MarketIndexTrackerComponent } from './marketindex-tracker/marketindex-tracker.component';
import { fromEventPattern } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

/* import AmplifyUIAngularModule  */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StockTrackerComponent,
    MarketIndexTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
