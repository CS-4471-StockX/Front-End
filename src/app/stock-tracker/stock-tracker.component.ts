import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MarketindexTrackerComponent } from '../marketindex-tracker/marketindex-tracker.component';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.css']
})

export class StockTrackerComponent implements OnInit {

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

  public stockList: Array<any> = ["ABC", "BBC", "CBC"]

  public resultsList: Array<any> = []

  public searchValue: string = ""

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
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

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
