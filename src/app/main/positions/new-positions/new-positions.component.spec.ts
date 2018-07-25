import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPositionsComponent } from './new-positions.component';

describe('NewPositionsComponent', () => {
  let component: NewPositionsComponent;
  let fixture: ComponentFixture<NewPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
