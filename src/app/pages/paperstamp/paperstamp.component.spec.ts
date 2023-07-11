/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PaperstampComponent } from './paperstamp.component';

describe('PaperstampComponent', () => {
  let component: PaperstampComponent;
  let fixture: ComponentFixture<PaperstampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperstampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperstampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
