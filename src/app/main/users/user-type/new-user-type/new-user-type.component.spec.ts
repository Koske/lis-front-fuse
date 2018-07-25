import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserTypeComponent } from './new-user-type.component';

describe('NewUserTypeComponent', () => {
  let component: NewUserTypeComponent;
  let fixture: ComponentFixture<NewUserTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewUserTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
