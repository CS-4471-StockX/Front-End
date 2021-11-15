import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketIndexTrackerComponent } from './marketindex-tracker.component';

describe('MarketIndexTrackerComponent', () => {
  let component: MarketIndexTrackerComponent;
  let fixture: ComponentFixture<MarketIndexTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketIndexTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketIndexTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
