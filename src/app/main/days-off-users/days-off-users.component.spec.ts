import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOffUsersComponent } from './days-off-users.component';

describe('DaysOffUsersComponent', () => {
  let component: DaysOffUsersComponent;
  let fixture: ComponentFixture<DaysOffUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysOffUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysOffUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
