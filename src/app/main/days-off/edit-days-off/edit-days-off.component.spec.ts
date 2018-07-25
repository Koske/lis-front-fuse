import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDaysOffComponent } from './edit-days-off.component';

describe('EditDaysOffComponent', () => {
  let component: EditDaysOffComponent;
  let fixture: ComponentFixture<EditDaysOffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDaysOffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDaysOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
