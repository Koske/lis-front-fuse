import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessClientComponent } from './business-client.component';

describe('BusinessClientComponent', () => {
  let component: BusinessClientComponent;
  let fixture: ComponentFixture<BusinessClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
