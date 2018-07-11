import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPresenceReportComponent } from './edit-presence-report.component';

describe('EditPresenceReportComponent', () => {
  let component: EditPresenceReportComponent;
  let fixture: ComponentFixture<EditPresenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPresenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPresenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
