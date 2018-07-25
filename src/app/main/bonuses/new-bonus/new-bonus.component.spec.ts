import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBonusComponent } from './new-bonus.component';

describe('NewBonusComponent', () => {
  let component: NewBonusComponent;
  let fixture: ComponentFixture<NewBonusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBonusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
