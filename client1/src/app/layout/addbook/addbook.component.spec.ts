/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddbookComponent } from './addbook.component';

describe('AddbookComponent', () => {
  let component: AddbookComponent;
  let fixture: ComponentFixture<AddbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
