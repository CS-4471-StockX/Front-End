import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketindexTrackerComponent } from './marketindex-tracker.component';

describe('MarketindexTrackerComponent', () => {
  let component: MarketindexTrackerComponent;
  let fixture: ComponentFixture<MarketindexTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketindexTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketindexTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
