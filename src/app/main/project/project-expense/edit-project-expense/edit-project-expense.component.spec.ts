import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectExpenseComponent } from './edit-project-expense.component';

describe('EditProjectExpenseComponent', () => {
  let component: EditProjectExpenseComponent;
  let fixture: ComponentFixture<EditProjectExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
