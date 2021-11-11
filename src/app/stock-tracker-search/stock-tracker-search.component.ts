import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stock-tracker-search',
  templateUrl: './stock-tracker-search.component.html',
  styleUrls: ['./stock-tracker-search.component.css']
})
export class StockTrackerSearchComponent implements OnInit {

  public stockList: Array<any> = ["ABC", "BBC", "CBC"]

  public resultsList: Array<any> = []

  public searchValue: string = ""

  private temp: any
  
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.temp = this.route.params.subscribe(params => {this.searchValue = params['search']})
    this.doSearch()
  }

  public doSearch() {
    let results: Array<any> = []
    for (let i = 0; i < this.stockList.length; i++) {
      if ((this.stockList[i]).toUpperCase().includes((this.searchValue).toUpperCase())) {
        results.push(this.stockList[i])
      }
    }
    console.log(results)
    this.resultsList = results

    var e = "";
    for (var j = 0; j < this.resultsList.length; j++)
    {
      e += this.resultsList[j] + "<br/>";
    }

    const myElement = document.getElementById('resultsList')!
    myElement.innerHTML = e
  }

  public getSearchResults() {
    this.doSearch()
    this.router.navigate(['/stock-tracker-search', this.searchValue])
  }
}
