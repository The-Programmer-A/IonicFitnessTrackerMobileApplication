import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BicepListPage } from './bicep-list.page';

describe('BicepListPage', () => {
  let component: BicepListPage;
  let fixture: ComponentFixture<BicepListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BicepListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BicepListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
