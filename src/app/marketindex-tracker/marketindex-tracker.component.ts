import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-marketindex-tracker',
  templateUrl: './marketindex-tracker.component.html',
  styleUrls: ['./marketindex-tracker.component.css']
})
export class MarketIndexTrackerComponent implements OnInit {
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

  constructor(
    private httpClient: HttpClient,
    public formBuilder: FormBuilder,
  ) { }

  marketIndexListForm = this.formBuilder.group({
    marketIndexName: ['', [Validators.required]]
  })

  changeMarketIndex(e) {
    this.marketIndexListForm.get('marketIndexName')!.setValue(e.target.value, {
       onlySelf: true
    })
    
    this.onSubmit()
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
    } else if (this.marketIndex == 'S&P/TSX Composite Index'){
      this.marketIndexSymbol = 'TSX'
      this.marketIndexTicker = '5EGSPTSE'
    } else {
      this.marketIndexSymbol = 'SPX'
      this.marketIndexTicker = '5EGSPC'
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
  }


  ngOnInit(): void {
    this.getMarketIndexInfo(this.marketIndexTicker);
    this.getMarketIndexGraphInfo(this.marketIndexTicker)
    this.onClickWeek()
    setTimeout(() => 1000)
  }

  getMarketIndexInfo(ticker: string){
    this.httpClient.get<any>('https://market-index-tracker.stockx.software/market-index?ticker=%' + ticker).subscribe(
      response => {
        console.log(response)
        this.currentPrice = response.price
        this.priceChange = response.change
        this.percentageChange = response.changesPercentage
        this.dayHigh = response.dayHigh
        this.dayLow = response.dayLow
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
    this.chartLabels = Object.keys(this.marketIndexWeekData)
    this.chartData = Object.values(this.marketIndexWeekData)
    this.chartDatasets = [{data: this.chartData, label: this.marketIndexSymbol, lineTension: 0}]

    this.weekLinkColour = "#ffffff"
    this.monthLinkColour = "#808080"
    this.yearLinkColour = "#808080"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  onClickMonth(){
    this.marketIndexGraphDuration = 'month'
    this.chartLabels = Object.keys(this.marketIndexMonthData)
    this.chartData = Object.values(this.marketIndexMonthData)
    this.chartDatasets = [{data: this.chartData, label: this.marketIndexSymbol, lineTension: 0}]

    this.weekLinkColour = "#808080"
    this.monthLinkColour = "#ffffff"
    this.yearLinkColour = "#808080"

    console.log(this.chartLabels)
    console.log(this.chartData)
  }

  onClickYear(){
    this.marketIndexGraphDuration = 'year'
    this.chartLabels = Object.keys(this.marketIndexYearData)
    this.chartData = Object.values(this.marketIndexYearData)
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