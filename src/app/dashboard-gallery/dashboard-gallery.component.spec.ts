import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  GoogleChartComponent,
  GoogleChartsControlComponent,
  GoogleChartsDashboardComponent,
} from 'ng2-google-charts';
import { DashboardGalleryComponent } from './dashboard-gallery.component';

describe('DashboardGalleryComponent', () => {
  let component: DashboardGalleryComponent;
  let fixture: ComponentFixture<DashboardGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DashboardGalleryComponent,
        GoogleChartComponent,
        GoogleChartsControlComponent,
        GoogleChartsDashboardComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
