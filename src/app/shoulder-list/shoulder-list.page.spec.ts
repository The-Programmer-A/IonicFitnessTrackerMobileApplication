import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoulderListPage } from './shoulder-list.page';

describe('ShoulderListPage', () => {
  let component: ShoulderListPage;
  let fixture: ComponentFixture<ShoulderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoulderListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoulderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
