import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectExpenseComponent } from './new-project-expense.component';

describe('NewProjectExpenseComponent', () => {
  let component: NewProjectExpenseComponent;
  let fixture: ComponentFixture<NewProjectExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProjectExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
