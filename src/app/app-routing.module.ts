import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { StockTrackerSearchComponent } from './stock-tracker-search/stock-tracker-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'stock-tracker', component: StockTrackerComponent},
  { path: 'stock-tracker-search/:search', component: StockTrackerSearchComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
