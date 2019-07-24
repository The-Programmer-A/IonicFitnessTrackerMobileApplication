import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegsListPage } from './legs-list.page';

describe('LegsListPage', () => {
  let component: LegsListPage;
  let fixture: ComponentFixture<LegsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
