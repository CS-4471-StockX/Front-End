import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ChartsModule } from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { MarketIndexTrackerComponent } from './marketindex-tracker/marketindex-tracker.component';
import { CurrencyTrackerComponent } from './currency-tracker/currency-tracker.component';
import { StockTrackerSearchComponent } from './stock-tracker-search/stock-tracker-search.component';
import { CurrencyTrackerSearchComponent } from './currency-tracker-search/currency-tracker-search.component';
import { IndustryListingsComponent } from './industry-listings/industry-listings.component';
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
    MarketIndexTrackerComponent,
    CurrencyTrackerComponent,
    StockTrackerSearchComponent,
    CurrencyTrackerSearchComponent,
    IndustryListingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
