import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignInvoiceComponent } from './foreign-invoice.component';

describe('ForeignInvoiceComponent', () => {
  let component: ForeignInvoiceComponent;
  let fixture: ComponentFixture<ForeignInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForeignInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeignInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
