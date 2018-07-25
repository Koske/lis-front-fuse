import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusinessClientComponent } from './new-business-client.component';

describe('NewBusinessClientComponent', () => {
  let component: NewBusinessClientComponent;
  let fixture: ComponentFixture<NewBusinessClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusinessClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
