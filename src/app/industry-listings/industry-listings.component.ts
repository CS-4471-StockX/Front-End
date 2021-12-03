import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PubSub } from 'aws-amplify';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-industry-listings',
  templateUrl: './industry-listings.component.html',
  styleUrls: ['./industry-listings.component.css']
})
export class IndustryListingsComponent implements OnInit {
  submitted = false;

  industryList: any = ['Energy', 'Materials', 'Industrials', 'Utilities', 'Healthcare', 'Financials', 'ConsumerDiscretionary', 'ConsumerStaples', 'InformationTechnology', 'CommunicationsServices', 'RealEstate']
  industryListing: any = 'Energy'
  industryLabel: any = 'INDUSTRY:'
  industryTicker: any = 'Energy'

  topStocks: any = []
  stockName: any = []
  currentPrice: any = []
  priceChange: any = []
  percentageChange: any = []
  dayHigh: any = []
  dayLow: any = []

  subData: any = ''
  updated: string = 'false'
  subbedIndustry: any = ''
  chartLoaded: boolean = false

  constructor(
    private httpClient: HttpClient,
    public formBuilder: FormBuilder,
  ) { }

  industryListForm = this.formBuilder.group({
    industryName: ['', [Validators.required]]
  })

  changeIndustry(e) {
    this.industryListForm.get('industryName')!.setValue(e.target.value, {
       onlySelf: true
    })
    
    this.onSubmit()
    console.log("change")
  }

  public handleDropdownError = (controlName: string, errorName: string) => {
    return this.industryListForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    this.submitted = true;
    this.industryListing = JSON.stringify(this.industryListForm.value)
    this.industryListing = JSON.parse(this.industryListing)
    this.industryListing = this.industryListing.industryName

    this.industryTicker = this.industryListing

    this.getIndustryListingInfo(this.industryTicker)
  }


  ngOnInit(): void {
    this.getIndustryListingInfo(this.industryTicker);
    setTimeout(() => 1000)
  }

  @HostListener('unloaded')
  ngOnDestroy() {
    this.subbedIndustry.unsubscribe()
    this.httpClient.put<any>('https://subscription-manager.stockx.software/unsubscribe?symbol=' + this.industryTicker + '&service=industry-stock-listings-ws', null).subscribe()
  }

  subIndustryListingInfo(topic: string){
    this.subbedIndustry = PubSub.subscribe(this.industryTicker).subscribe({
      next: data => this.updatePageContent(data),
      error: error => console.error(error),
      complete: () => console.log('Done'),
    });

    this.httpClient.put<any>('https://subscription-manager.stockx.software/subscribe?symbol=' + this.industryTicker + '&service=industry-stock-listings-ws', null).subscribe()
  }

  updatePageContent(data: any){
    console.log("message received", data)

    this.subData = data

    this.topStocks = this.subData.top5StocksByMarketCap
    for (let i = 0; i < 5; i++) {
      this.stockName[i] = this.topStocks[i].ticker
      this.currentPrice[i] = this.topStocks[i].currentPrice.toFixed(2)
      this.priceChange[i] = this.topStocks[i].priceChange.toFixed(2)
      this.percentageChange[i] = this.topStocks[i].percentageChange.toFixed(2)
      this.dayHigh[i] = this.topStocks[i].dayHigh.toFixed(2)
      this.dayLow[i] = this.topStocks[i].dayLow.toFixed(2)
    }

    this.ngOnInit()
  }

  getIndustryListingInfo(ticker: string){
    this.httpClient.get<any>('https://industry-stock-tracker.stockx.software/industry-stock-listings?sector=' + ticker).subscribe(
      response => {
        this.topStocks = response.top5StocksByMarketCap
        console.log(this.topStocks)
        for (let i = 0; i < 5; i++) {
          this.stockName[i] = this.topStocks[i].ticker
          this.currentPrice[i] = this.topStocks[i].currentPrice.toFixed(2)
          this.priceChange[i] = this.topStocks[i].priceChange.toFixed(2)
          this.percentageChange[i] = this.topStocks[i].percentageChange.toFixed(2)
          this.dayHigh[i] = this.topStocks[i].dayHigh.toFixed(2)
          this.dayLow[i] = this.topStocks[i].dayLow.toFixed(2)
        }
      }
    )
  }
}
