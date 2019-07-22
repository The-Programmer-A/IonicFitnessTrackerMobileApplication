import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecordPage } from './new-record.page';

describe('NewRecordPage', () => {
  let component: NewRecordPage;
  let fixture: ComponentFixture<NewRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRecordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
