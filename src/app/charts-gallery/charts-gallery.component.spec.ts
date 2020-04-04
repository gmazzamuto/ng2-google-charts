import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  GoogleChartComponent,
  GoogleChartsControlComponent,
  GoogleChartsDashboardComponent,
} from 'ng2-google-charts';
import { ChartsGalleryComponent } from './charts-gallery.component';

describe('ChartsGalleryComponent', () => {
  let component: ChartsGalleryComponent;
  let fixture: ComponentFixture<ChartsGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChartsGalleryComponent,
        GoogleChartComponent,
        GoogleChartsControlComponent,
        GoogleChartsDashboardComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
