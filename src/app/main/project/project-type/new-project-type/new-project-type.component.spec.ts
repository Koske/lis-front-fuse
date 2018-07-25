import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectTypeComponent } from './new-project-type.component';

describe('NewProjectTypeComponent', () => {
  let component: NewProjectTypeComponent;
  let fixture: ComponentFixture<NewProjectTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
