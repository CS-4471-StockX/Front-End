import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CurrencyTrackerComponent } from './currency-tracker/currency-tracker.component';
import { MarketIndexTrackerComponent } from './marketindex-tracker/marketindex-tracker.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { StockTrackerSearchComponent } from './stock-tracker-search/stock-tracker-search.component';
import { CurrencyTrackerSearchComponent } from './currency-tracker-search/currency-tracker-search.component';
import { IndustryListingsComponent } from './industry-listings/industry-listings.component';

const routes: Routes = [
  { path: '', component: StockTrackerComponent},
  { path: 'stock-tracker', component: StockTrackerComponent},
  { path: 'market-index', component: MarketIndexTrackerComponent},
  { path: 'currency-tracker', component: CurrencyTrackerComponent},
  { path: 'stock-tracker-search/:search', component: StockTrackerSearchComponent},
  { path: 'currency-tracker-search/:search', component: CurrencyTrackerSearchComponent},
  { path: 'industry-listings', component: IndustryListingsComponent},
  { path: '**', redirectTo: 'stock-tracker'},
  { path: '', component: StockTrackerComponent, runGuardsAndResolvers: 'always' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
