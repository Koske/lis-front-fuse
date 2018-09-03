import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticInvoiceComponent } from './domestic-invoice.component';

describe('DomesticInvoiceComponent', () => {
  let component: DomesticInvoiceComponent;
  let fixture: ComponentFixture<DomesticInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
