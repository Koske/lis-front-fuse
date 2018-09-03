import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticPdvInvoiceComponent } from './domestic-pdv-invoice.component';

describe('DomesticPdvInvoiceComponent', () => {
  let component: DomesticPdvInvoiceComponent;
  let fixture: ComponentFixture<DomesticPdvInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomesticPdvInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomesticPdvInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
