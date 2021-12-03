import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { StaticSymbolResolver } from '@angular/compiler';

@Component({
  selector: 'app-stock-tracker-search',
  templateUrl: './stock-tracker-search.component.html',
  styleUrls: ['./stock-tracker-search.component.css']
})
export class StockTrackerSearchComponent implements OnInit {

  stockList: Array<any> = []
  resultsList: Array<any> = []
  symbolsList: Array<any> = []
  stockCount: number = 0
  searchValue: string = ""
  apiCallQuery: string = 'https://live-stock-tracker.stockx.software/find-symbol?query='

  private temp: any
  
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.temp = this.route.params.subscribe(params => {this.searchValue = params['search']})
    this.doSearch()
  }

  doSearch() {
    this.apiCallQuery = 'https://live-stock-tracker.stockx.software/find-symbol?query=' + this.searchValue
    console.log(this.apiCallQuery)
    let results: Array<any> = []
    let symbols: Array<any> = []
    this.httpClient.get<any>(this.apiCallQuery).subscribe(
      response => {
        this.stockCount = response.count
        this.stockList = response.result
        console.log(this.stockCount)
        console.log(this.stockList)
      }
    )

    for (let i = 0; i < this.stockCount; i++) {
      if ((this.stockList[i].description).toUpperCase().includes((this.searchValue).toUpperCase())) {
        results.push(this.stockList[i].description + " , " + this.stockList[i].symbol)
        symbols.push(this.stockList[i].symbol)
      }
    }
    console.log(results)
    this.resultsList = results
    this.symbolsList = symbols

    let list = document.getElementById('searchResults');

    let count = 0
    this.resultsList.forEach((item)=>{
      let currentSymbol = item.substring(item.indexOf(",") + 2)
      let currentName = item.substring(0, (item.indexOf(",")))
      console.log(currentSymbol)
      let li = document.createElement("li");
      li.innerText = item;
      li.innerHTML = '<a href="stock-tracker/?symbol=' + currentSymbol + '&name=' + currentName + '">' + item + '</a>';
      list?.appendChild(li);
      count += 1
    })
  }

  public getSearchResults() {
    this.doSearch()
    this.router.navigate(['/stock-tracker-search', this.searchValue])
  }
}
