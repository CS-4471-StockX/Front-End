import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { PubSub } from 'aws-amplify';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-tracker-search',
  templateUrl: './currency-tracker-search.component.html',
  styleUrls: ['./currency-tracker-search.component.css']
})
export class CurrencyTrackerSearchComponent implements OnInit {
  currency1: string = "USD"
  currency2: string = "CAD"
  chartTitle: string = ""
  rate: number = 1.00000
  rates: any = []
  dates: any = []
  chartData: any = []
  weekLinkColour: string = '#808080'

  public currencyList: Array<any> = ["EUR", "USD", "CHF"]
  public resultsList: Array<any> = []
  public searchValue: string = ""

  subData: any = ''
  updated: string = 'false'
  subbedCurrency: any = ''
  chartLoaded: boolean = false

  private temp: any

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.weekLinkColour = '#808080'
    this.temp = this.route.params.subscribe(params => {this.searchValue = params['search']})
    if (this.searchValue != null) {
      this.currency1 = this.searchValue.substring(0,3)
      this.currency2 = this.searchValue.substring(this.searchValue.indexOf(":") + 1)
    }
    this.getCurrencyInfo(this.currency1, this.currency2);
    this.getCurrencyGraphInfo(this.currency1, this.currency2);

  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.subbedCurrency.unsubscribe()
    this.httpClient.put<any>('https://subscription-manager.stockx.software/unsubscribe?symbol=' + this.currency1 + '_' + this.currency2 + '&service=currency-tracker-tracker-ws', null).subscribe()
  }

  getCurrencyInfo(x: any, y: any){
    this.httpClient.get<any>('https://currency-tracker.stockx.software/currencies?c1='+ x + '&c2=' + y).subscribe(
      response => {
        this.currency1 = response.currency1
        this.currency2 = response.currency2
        this.rate = response.rate
        this.chartTitle = this.currency1 + ' to ' + this.currency2;
      }
    )
  }

  subStockInfo(){
    this.subbedCurrency = PubSub.subscribe(this.currency1 + '_' + this.currency2).subscribe({
      next: data => this.updatePageContent(data),
      error: error => console.error(error),
      complete: () => console.log('Done'),
    })

    this.httpClient.put<any>('https://subscription-manager.stockx.software/subscribe?symbol=' + this.stockSymbol + '&service=live-stock-tracker-ws', null).subscribe()
  }

  updatePageContent(data: any){
    console.log("message received", data)

    this.subData = data

    this.currency1 = this.subData.currency1
    this.currency2 = this.subData.currency2
    this.rate = this.subData.rate

    this.ngOnInit()
  }

  getCurrencyGraphInfo(x: any, y: any){
    this.httpClient.get<any>('https://currency-tracker.stockx.software/graph?c1='+ x + '&c2=' + y).subscribe(
      response => {
        this.currency1 = response.currency1
        this.currency2 = response.currency2
        this.rates = response.rates
        this.dates = response.dates
        this.chartTitle = this.currency1 + ' to ' + this.currency2;

        console.log(this.rates)
        console.log(this.dates)
        console.log(this.chartTitle)
      }
    )
  }

  onClickWeek(){
    this.chartLabels = this.dates
    this.chartData = this.rates
    this.chartDatasets = [{data: this.chartData, label: this.chartTitle, lineTension: 0}]
    this.weekLinkColour = "#ffffff"
  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: this.rates, label: this.chartTitle, lineTension: 0 }
  ];

  public chartLabels: Array<any> = this.dates;

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(226, 82, 82, .2)',
      borderColor: '#e25252',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    hover: {
      mode: 'nearest',
      intersec: true,
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'RATE ($)',
          fontColor: "#fff",
          fontSize: 18,
          fontFamily: "Manrope",
        },
        gridLines: {
          color: "#222"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'DAY',
          fontColor: "#fff",
          fontSize: 18,
          fontFamily: "Manrope",
        },
        gridLines: {
          color: "#222"
        }
      }]
    },
    title: {
      display: true,
      text: 'HISTORICAL CURRENCY RATES',
      fontColor: "#fff",
      fontSize: 25,
      fontFamily: "Manrope",
    },
  };

  public getChartData() {

  }

  public changeChartDuration() {

  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public getSearchResults() {
    this.router.navigate(['/currency-tracker-search', this.searchValue])
    this.ngOnInit()
  }
}
