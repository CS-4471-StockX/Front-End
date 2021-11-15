import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MarketIndexTrackerComponent } from './marketindex-tracker/marketindex-tracker.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'stock-tracker', component: StockTrackerComponent},
  { path: 'market-index', component: MarketIndexTrackerComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
