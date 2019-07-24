import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackListPage } from './back-list.page';

describe('BackListPage', () => {
  let component: BackListPage;
  let fixture: ComponentFixture<BackListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
