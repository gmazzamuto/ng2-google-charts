import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GoogleChartsLoaderService } from 'ng2-google-charts';

let service: GoogleChartsLoaderService;

describe('AppComponent', () => {
  beforeEach(async(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
