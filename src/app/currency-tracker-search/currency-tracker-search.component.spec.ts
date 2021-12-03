import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTrackerSearchComponent } from './currency-tracker-search.component';

describe('CurrencyTrackerSearchComponent', () => {
  let component: CurrencyTrackerSearchComponent;
  let fixture: ComponentFixture<CurrencyTrackerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyTrackerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyTrackerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
