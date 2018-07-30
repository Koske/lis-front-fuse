import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeclinedDayOffComponent } from './dialog-declined-day-off.component';

describe('DialogDeclinedDayOffComponent', () => {
  let component: DialogDeclinedDayOffComponent;
  let fixture: ComponentFixture<DialogDeclinedDayOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDeclinedDayOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeclinedDayOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
