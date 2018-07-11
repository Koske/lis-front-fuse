import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapeDetailsComponent } from './etape-details.component';

describe('EtapeDetailsComponent', () => {
  let component: EtapeDetailsComponent;
  let fixture: ComponentFixture<EtapeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
