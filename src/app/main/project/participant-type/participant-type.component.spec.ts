import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantTypeComponent } from './participant-type.component';

describe('ParticipantTypeComponent', () => {
  let component: ParticipantTypeComponent;
  let fixture: ComponentFixture<ParticipantTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
