import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreListPage } from './core-list.page';

describe('CoreListPage', () => {
  let component: CoreListPage;
  let fixture: ComponentFixture<CoreListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoreListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoreListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
