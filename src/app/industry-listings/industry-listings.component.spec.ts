import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryListingsComponent } from './industry-listings.component';

describe('IndustryListingsComponent', () => {
  let component: IndustryListingsComponent;
  let fixture: ComponentFixture<IndustryListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryListingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
