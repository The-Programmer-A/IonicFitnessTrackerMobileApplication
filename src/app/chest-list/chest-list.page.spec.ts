import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChestListPage } from './chest-list.page';

describe('ChestListPage', () => {
  let component: ChestListPage;
  let fixture: ComponentFixture<ChestListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChestListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChestListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
