import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { PubSub } from 'aws-amplify';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-marketindex-tracker',
  templateUrl: './marketindex-tracker.component.html',
  styleUrls: ['./marketindex-tracker.component.css']
})

export class MarketIndexTrackerComponent implements OnInit {
  private routeSub: any;

  submitted = false;

  marketIndexList: any = ['S&P 500', 'Dow Jones', 'S&P/TSX Composite Index']
  marketIndex: any = 'S&P 500'
  marketIndexSymbol: any = 'SPX'
  marketIndexTicker: any = '5EGSPC'

  marketIndexWeekData: any = []
  marketIndexMonthData: any = []
  marketIndexYearData: any = []

  marketIndexGraphDuration: any = 'week'
  weekLinkColour: string = '#808080'
  monthLinkColour: string = '#808080'
  yearLinkColour: string = '#808080'

  chartData: any = []
  chartLabelString: any = 'DAY'

  currentPrice: number = 0
  priceChange: number = 0
  percentageChange: number = 0
  dayHigh: number = 0
  dayLow: number = 0
  
  subData: any = ''
  topic: string = '^DJI'
  subbedIndex: any = ''

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    public formBuilder: FormBuilder,
  ){}

  marketIndexListForm = this.formBuilder.group({
    marketIndexName: ['', [Validators.required]]
  })

  changeMarketIndex(e) {
    this.marketIndexListForm.get('marketIndexName')!.setValue(e.target.value, {
       onlySelf: true
    })
    
    this.onSubmit()
    console.log("change")
  }

  public handleDropdownError = (controlName: string, errorName: string) => {
    return this.marketIndexListForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.submitted = true;
    this.marketIndex = JSON.stringify(this.marketIndexListForm.value)
    this.marketIndex = JSON.parse(this.marketIndex)
    this.marketIndex = this.marketIndex.marketIndexName

    if(this.marketIndex == 'Dow Jones'){
      this.marketIndexSymbol = 'DOW'
      this.marketIndexTicker = '5EDJI'
      this.topic = '^DJI'
    } else if (this.marketIndex == 'S&P/TSX Composite Index'){
      this.marketIndexSymbol = 'TSX'
      this.marketIndexTicker = '5EGSPTSE'
      this.topic = '^GSPTSE'
    } else {
      this.marketIndexSymbol = 'SPX'
      this.marketIndexTicker = '5EGSPC'
      this.topic = '^GSPC'
    }

    this.getMarketIndexInfo(this.marketIndexTicker)
    this.getMarketIndexGraphInfo(this.marketIndexTicker)
    if (this.marketIndexGraphDuration == 'week'){
      this.onClickWeek()
    } else if (this.marketIndexGraphDuration == 'month'){
      this.onClickMonth()
    } else {
      this.onClickYear()
    }

    this.subMarketIndexInfo(this.topic)
  }

  ngOnInit(): void {
    this.getMarketIndexInfo(this.marketIndexTicker)
    this.getMarketIndexGraphInfo(this.marketIndexTicker)
    this.subMarketIndexInfo(this.topic)
    this.onClickWeek()
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.subbedIndex.unsubscribe()
    this.httpClient.put<any>('https://subscription-manager.stockx.software/unsubscribe?symbol=%' + this.marketIndexTicker + '&service=market-index-tracker-ws', null).subscribe()
  } 

  subMarketIndexInfo(topic: string){
    this.subbedIndex = PubSub.subscribe(topic).subscribe({
      next: data => this.updatePageContent(data),
      error: error => console.error(error),
      complete: () => console.log('Done'),
    });

    this.httpClient.put<any>('https://subscription-manager.stockx.software/subscribe?symbol=%' + this.marketIndexTicker + '&service=market-index-tracker-ws', null).subscribe()
  }

  updatePageContent(data: any){
    console.log("message received", data)

    this.subData = data

    if(this.currentPrice != undefined){
      this.currentPrice = this.subData.price.toFixed(2)
      this.priceChange = this.subData.change.toFixed(2)
      this.percentageChange = this.subData.changesPercentage.toFixed(2)
      this.dayHigh = this.subData.dayHigh.toFixed(2)
      this.dayLow = this.subData.dayLow.toFixed(2)
    } else {
      this.marketIndexWeekData = this.subData.fiveDay.historical
      this.marketIndexMonthData = this.subData.oneMonth.historical
      this.marketIndexYearData = this.subData.oneYear.historical
    }

    this.ngOnInit()
  }

  getMarketIndexInfo(ticker: string){
    this.httpClient.get<any>('https://market-index-tracker.stockx.software/market-index?ticker=%' + ticker).subscribe(
      response => {
        console.log(response)
        this.currentPrice = response.price.toFixed(2)
        this.priceChange = response.change.toFixed(2)
        this.percentageChange = response.changesPercentage.toFixed(2)
        this.dayHigh = response.dayHigh.toFixed(2)
        this.dayLow = response.dayLow.toFixed(2)
      }
    )
  }

  getMarketIndexGraphInfo(ticker: string){
    this.httpClient.get<any>('https://market-index-tracker.stockx.software/historical/market-index-price?ticker=%' + ticker).subscribe(
      response => {
        this.marketIndexWeekData = response.fiveDay.historical
        this.marketIndexMonthData = response.oneMonth.historical
        this.marketIndexYearData = response.oneYear.historical

        console.log(this.marketIndexWeekData)
      }
    )
  }

  onClickWeek(){
    this.marketIndexGraphDuration = 'week'
    this.chartLabels = Object.keys(this.marketIndexWeekData).reverse()
    this.chartData = Object.values(this.marketIndexWeekData).reverse()
    this.chartDatasets = [{data: this.chartData, label: this.marketIndexSymbol, lineTension: 0}]

    this.weekLinkColour = "#ffffff"
    this.monthLinkColour = "#808080"
    this.yearLinkColour = "#808080"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  onClickMonth(){
    this.marketIndexGraphDuration = 'month'
    this.chartLabels = Object.keys(this.marketIndexMonthData).reverse()
    this.chartData = Object.values(this.marketIndexMonthData).reverse()
    this.chartDatasets = [{data: this.chartData, label: this.marketIndexSymbol, lineTension: 0}]

    this.weekLinkColour = "#808080"
    this.monthLinkColour = "#ffffff"
    this.yearLinkColour = "#808080"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  onClickYear(){
    this.marketIndexGraphDuration = 'year'
    this.chartLabels = Object.keys(this.marketIndexYearData).reverse()
    this.chartData = Object.values(this.marketIndexYearData).reverse()
    this.chartDatasets = [{data: this.chartData, label: this.marketIndexSymbol, lineTension: 0}]

    this.weekLinkColour = "#808080"
    this.monthLinkColour = "#808080"
    this.yearLinkColour = "#ffffff"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [28, 48, 40, 74, 86, 81, 90, 100, 126, 114, 110, 118], label: 'ABC', lineTension: 0 }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(11, 158, 57, .2)',
      borderColor: '#0b9e39',
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
          labelString: "DAY",
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
      text: 'HISTORICAL MARKET INDEX PRICES',
      fontColor: "#fff",
      fontSize: 25,
      fontFamily: "Manrope",
    }, 
  };
}