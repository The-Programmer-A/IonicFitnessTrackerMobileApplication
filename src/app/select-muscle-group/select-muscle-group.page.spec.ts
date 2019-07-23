import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMuscleGroupPage } from './select-muscle-group.page';

describe('SelectMuscleGroupPage', () => {
  let component: SelectMuscleGroupPage;
  let fixture: ComponentFixture<SelectMuscleGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectMuscleGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMuscleGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
