import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

describe('App: Ng2GoogleCharts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        Ng2GoogleChartsModule
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
