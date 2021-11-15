import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css']
})


export class StockTrackerComponent implements OnInit {
  currentPrice: number = 0
  priceChange: number = 0
  percentageChange: number = 0
  dayHigh: number = 0
  dayLow: number = 0
  openingPrice: number = 0
  previousClosingPrice: number = 0

  constructor(
    private httpClient: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getStockInfo();
  }

  getStockInfo(){
    this.httpClient.get<any>('https://live-stock-tracker.stockx.software/stock-quote?ticker=TSLA').subscribe(
      response => {
        this.currentPrice = response.currentPrice
        this.priceChange = response.priceChange
        this.percentageChange = response.percentageChange
        this.dayHigh = response.dayHigh
        this.dayLow = response.dayLow
        this.openingPrice = response.openingPrice
        this.previousClosingPrice = response.previousClosingPrice
      }
    )
  }

  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [28, 48, 40, 74, 86, 81, 90, 100, 126, 114, 110, 118], label: 'ABC', lineTension: 0 }
  ];

  public chartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
}
