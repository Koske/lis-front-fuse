import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOffRequestComponent } from './days-off-request.component';

describe('DaysOffRequestComponent', () => {
  let component: DaysOffRequestComponent;
  let fixture: ComponentFixture<DaysOffRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysOffRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysOffRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
