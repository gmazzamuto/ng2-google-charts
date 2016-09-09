/* tslint:disable:no-unused-variable */
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { GoogleChartComponent } from './google-chart/google-chart.component'
import { GoogleChartsLoaderService } from './google-charts-loader.service'

describe('App: Ng2GoogleCharts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GoogleChartComponent
      ],
      providers: [
        GoogleChartsLoaderService
      ],
      imports: [
        FormsModule
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
