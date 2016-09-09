/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { GoogleChartComponent } from './google-chart.component';

describe('Component: GoogleChart', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestChartComponent
      ],
      imports: [
        FormsModule
      ]
    });
    TestBed.compileComponents();
  }));

  let fixture: ComponentFixture<TestChartComponent>;
  let fixtureInstance: TestChartComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChartComponent);
    fixture.detectChanges();
    fixtureInstance = fixture.componentInstance;
  });

  it('should create an instance', () =>  {
      let component = fixtureInstance;
      expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-test-chart',
  template: '<app-google-chart [(ngModel)]="testChartData" ngDefaultControl></app-google-chart>',
})
class TestChartComponent {
  public testChartData =  {
      chartType: 'ColumnChart',
      dataTable: [
        ['Country', 'Performance', 'Profits'],
        ['Germany', 700, 1200],
        ['USA', 300, 600],
        ['Brazil', 400, 500],
        ['Canada', 500, 1000],
        ['France', 600, 1100],
        ['RU', 800, 1000]
      ],
      options: {'title': 'Countries'},
    };
  public onChange(v: boolean) {}
}
