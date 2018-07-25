import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBusinessClientComponent } from './edit-business-client.component';

describe('EditBusinessClientComponent', () => {
  let component: EditBusinessClientComponent;
  let fixture: ComponentFixture<EditBusinessClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBusinessClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBusinessClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
