import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParticipantTypeComponent } from './new-participant-type.component';

describe('NewParticipantTypeComponent', () => {
  let component: NewParticipantTypeComponent;
  let fixture: ComponentFixture<NewParticipantTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewParticipantTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParticipantTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
