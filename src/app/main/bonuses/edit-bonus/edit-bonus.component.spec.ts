import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBonusComponent } from './edit-bonus.component';

describe('EditBonusComponent', () => {
  let component: EditBonusComponent;
  let fixture: ComponentFixture<EditBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
