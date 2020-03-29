import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartComponent } from './google-chart.component';
import { GoogleChartsLoaderService } from '../google-charts-loader.service';

describe('GoogleChartsComponent', () => {
  let component: GoogleChartComponent;
  let fixture: ComponentFixture<GoogleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleChartComponent ],
      providers: [{ provide: GoogleChartsLoaderService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleChartComponent);
    component = fixture.componentInstance;
    component.data = {
      chartType: 'PieChart',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
