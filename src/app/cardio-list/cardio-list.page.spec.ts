import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardioListPage } from './cardio-list.page';

describe('CardioListPage', () => {
  let component: CardioListPage;
  let fixture: ComponentFixture<CardioListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardioListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardioListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
