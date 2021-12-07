import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartsControlComponent } from './google-charts-control.component';

describe('GoogleChartsControlComponent', () => {
  let component: GoogleChartsControlComponent;
  let fixture: ComponentFixture<GoogleChartsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleChartsControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleChartsControlComponent);
    component = fixture.componentInstance;
    component.data = {
      controlType: 'CategoryFilter',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
