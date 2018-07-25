import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDaysOffComponent } from './new-days-off.component';

describe('NewDaysOffComponent', () => {
  let component: NewDaysOffComponent;
  let fixture: ComponentFixture<NewDaysOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDaysOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDaysOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
