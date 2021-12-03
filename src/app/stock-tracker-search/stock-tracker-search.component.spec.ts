import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTrackerSearchComponent } from './stock-tracker-search.component';

describe('StockTrackerSearchComponent', () => {
  let component: StockTrackerSearchComponent;
  let fixture: ComponentFixture<StockTrackerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockTrackerSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTrackerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
