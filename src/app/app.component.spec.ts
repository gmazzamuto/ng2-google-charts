import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GoogleChartComponent, GoogleChartsLoaderService } from 'ng2-google-charts';
import { I18nSelectPipe } from '@angular/common';

declare var google: any;
let service: GoogleChartsLoaderService;

describe('AppComponent', () => {
  beforeEach(async(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GoogleChartComponent,
      ],
      providers: [{ provide: GoogleChartsLoaderService}]
    }).compileComponents();
    service = TestBed.inject(GoogleChartsLoaderService);
  }));

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
