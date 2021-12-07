import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleChartsDashboardComponent } from './google-charts-dashboard.component';
import { GoogleChartsLoaderService } from '../google-charts-loader.service';

describe('GoogleChartsDashboardComponent', () => {
  let component: GoogleChartsDashboardComponent;
  let fixture: ComponentFixture<GoogleChartsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleChartsDashboardComponent ],
      providers: [{ provide: GoogleChartsLoaderService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleChartsDashboardComponent);
    component = fixture.componentInstance;
    component.data = {
      dataTable: [
        ['Name', 'Gender', 'Age', 'Donuts eaten'],
        ['Michael' , 'Male', 12, 5],
        ['Elisa', 'Female', 20, 7],
        ['Robert', 'Male', 7, 3],
        ['John', 'Male', 54, 2],
        ['Jessica', 'Female', 22, 6],
        ['Aaron', 'Male', 3, 1],
        ['Margareth', 'Female', 42, 8],
        ['Miranda', 'Female', 33, 6]
      ],
      formatters: [
        {
          columns: [3],
          type: 'ArrowFormat',
          options: {
            base: 5,
          },
        },
      ],
      bind: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
