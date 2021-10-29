import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyTrackerComponent } from './currency-tracker.component';

describe('CurrencyTrackerComponent', () => {
  let component: CurrencyTrackerComponent;
  let fixture: ComponentFixture<CurrencyTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
