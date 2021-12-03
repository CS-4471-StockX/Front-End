import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { PubSub } from 'aws-amplify';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css']
})

export class StockTrackerComponent implements OnInit {
  stockHourlyData: any = []
  stockDailyData: any = []
  stockWeeklyData: any = []
  stockMonthlyData: any = []
  stockYearlyData: any = []

  currentPrice: number = 0
  priceChange: number = 0
  percentageChange: number = 0
  dayHigh: number = 0
  dayLow: number = 0
  openingPrice: number = 0
  previousClosingPrice: number = 0

  stockGraphDuration: string = 'week'
  stockSymbol: string = 'TSLA'
  stockName: string = 'Tesla Inc.'

  chartData: any = []
  hourLinkColour: string = "#808080"
  dayLinkColour: string = "#808080"
  weekLinkColour: string = '#808080'
  monthLinkColour: string = '#808080'
  yearLinkColour: string = '#808080'

  public resultsList: Array<any> = []
  public searchValue: string = ""
  apiCallStock: string = 'https://live-stock-tracker.stockx.software/stock-quote?ticker=' + this.searchValue
  apiCallGraph: string = 'https://live-stock-tracker.stockx.software/graphs?ticker=' + this.searchValue
  subData: any = ''
  updated: string = 'false'
  subbedStock: any = ''
  chartLoaded: boolean = false

  private routeSub: any;  

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const symbol = urlParams.get('symbol');
    const name = urlParams.get('name');
    if (symbol == null) {
      this.stockSymbol = "ABC"
      this.stockName = "ABC"
    } else {
      this.stockSymbol = String(symbol)
      this.stockName = String(name)
    }
    this.apiCallStock = 'https://live-stock-tracker.stockx.software/stock-quote?ticker=' + symbol
    this.apiCallGraph = 'https://live-stock-tracker.stockx.software/graphs?ticker=' + symbol
    this.getStockInfo();
    this.getStockGraphInfo();
    this.subStockInfo();
    this.onClickWeek();
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.subbedStock.unsubscribe()
    this.httpClient.put<any>('https://subscription-manager.stockx.software/unsubscribe?symbol=' + this.stockSymbol + '&service=live-stock-tracker-ws', null).subscribe()
  } 

  getStockInfo(){
    this.httpClient.get<any>(this.apiCallStock).subscribe(
      response => {
        this.currentPrice = response.currentPrice.toFixed(2)
        this.priceChange = response.priceChange.toFixed(2)
        this.percentageChange = response.percentageChange.toFixed(2)
        this.dayHigh = response.dayHigh.toFixed(2)
        this.dayLow = response.dayLow.toFixed(2)
        this.openingPrice = response.openingPrice.toFixed(2)
        this.previousClosingPrice = response.previousClosingPrice.toFixed(2)
      }
    )
  }

  subStockInfo(){
    this.subbedStock = PubSub.subscribe(this.stockSymbol).subscribe({
      next: data => this.updatePageContent(data),
      error: error => console.error(error),
      complete: () => console.log('Done'),
    })

    this.httpClient.put<any>('https://subscription-manager.stockx.software/subscribe?symbol=' + this.stockSymbol + '&service=live-stock-tracker-ws', null).subscribe()
  }

  updatePageContent(data: any){
    console.log("message received", data)
    this.subData = data

    if(this.currentPrice != undefined){
      this.currentPrice = this.subData.currentPrice
      this.priceChange = this.subData.priceChange.toFixed(2)
      this.percentageChange = this.subData.percentageChange.toFixed(2)
      this.dayHigh = this.subData.dayHigh.toFixed(2)
      this.dayLow = this.subData.dayLow.toFixed(2)
      this.openingPrice = this.subData.openingPrice.toFixed(2)
      this.previousClosingPrice = this.subData.previousClosingPrice.toFixed(2)
    } else {
      this.stockHourlyData = this.subData.minutes
      this.stockDailyData = this.subData.hours
      this.stockWeeklyData = this.subData.days
      this.stockMonthlyData = this.subData.days
      this.stockYearlyData = this.subData.days
    }

    this.reloadComponent()
  }

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    
    this.onClickWeek()
  }

  getStockGraphInfo(){
    this.httpClient.get<any>(this.apiCallGraph).subscribe(
      response => {
        this.stockHourlyData = response.minutes
        this.stockDailyData = response.hours
        this.stockWeeklyData = response.days
        this.stockMonthlyData = response.days
        this.stockYearlyData = response.days

        console.log(this.stockHourlyData)
      }
    )
  }

  onClickHour(){
    this.stockGraphDuration = 'hour'
    this.chartLabels = Object.values(this.stockHourlyData.times)
    this.chartData = Object.values(this.stockHourlyData.prices)
    this.chartDatasets = [{data: this.chartData, label: this.stockSymbol, lineTension: 0}]

    this.hourLinkColour = "#ffffff"
    this.dayLinkColour = "#808080"
    this.weekLinkColour = "#808080"
    this.monthLinkColour = "#808080"
    this.yearLinkColour = "#808080"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  onClickDay(){
    this.stockGraphDuration = 'day'
    this.chartLabels = Object.values(this.stockDailyData.times)

    for (var index in this.chartLabels) {
      this.chartLabels[index] = this.chartLabels[index].substring(this.chartLabels[index].indexOf('t') + 1)
      console.log(this.chartLabels[index])
    }
    console.log(this.chartLabels)

    this.chartData = Object.values(this.stockDailyData.prices)
    this.chartDatasets = [{data: this.chartData, label: this.stockSymbol, lineTension: 0}]

    this.hourLinkColour = "#808080"
    this.dayLinkColour = "#ffffff"
    this.weekLinkColour = "#808080"
    this.monthLinkColour = "#808080"
    this.yearLinkColour = "#808080"

    console.log(this.chartData)
  }

  onClickWeek(){
    this.stockGraphDuration = 'week'
    this.chartLabels = Object.values(this.stockWeeklyData.times).slice(0, 7)

    this.chartData = Object.values(this.stockWeeklyData.prices).slice(0, 7)
    this.chartDatasets = [{data: this.chartData, label: this.stockSymbol, lineTension: 0}]

    this.hourLinkColour = "#808080"
    this.dayLinkColour = "#808080"
    this.weekLinkColour = "#ffffff"
    this.monthLinkColour = "#808080"
    this.yearLinkColour = "#808080"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  onClickMonth(){
    this.stockGraphDuration = 'month'
    this.chartLabels = Object.values(this.stockMonthlyData.times).slice(0, 30)
    this.chartData = Object.values(this.stockMonthlyData.prices).slice(0, 30)
    this.chartDatasets = [{data: this.chartData, label: this.stockSymbol, lineTension: 0}]

    this.hourLinkColour = "#808080"
    this.dayLinkColour = "#808080"
    this.weekLinkColour = "#808080"
    this.monthLinkColour = "#ffffff"
    this.yearLinkColour = "#808080"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  onClickYear(){
    this.stockGraphDuration = 'year'
    this.chartLabels = Object.values(this.stockYearlyData.times)
    this.chartData = Object.values(this.stockYearlyData.prices)
    this.chartDatasets = [{data: this.chartData, label: this.stockSymbol, lineTension: 0}]

    this.hourLinkColour = "#808080"
    this.dayLinkColour = "#808080"
    this.weekLinkColour = "#808080"
    this.monthLinkColour = "#808080"
    this.yearLinkColour = "#ffffff"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [this.stockDailyData.prices], label: this.stockSymbol, lineTension: 0 }
  ];

  public chartLabels: Array<any> = [this.stockDailyData.times];

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
          labelString: 'VALUE ($)',
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
          labelString: 'MONTH',
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
      text: 'HISTORICAL STOCK PRICE',
      fontColor: "#fff",
      fontSize: 25,
      fontFamily: "Manrope",
    },
  };

  // onChartClick(event: any) {
  //   console.log(this.chart.getPointDataAtEvent(event));
  // }

  public getChartData() {

  }

  public changeChartDuration() {

  }


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public getSearchResults() {
    this.router.navigate(['/stock-tracker-search', this.searchValue])
  }
}
