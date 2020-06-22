import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMatchesComponent } from './owner-matches.component';

describe('OwnerMatchesComponent', () => {
  let component: OwnerMatchesComponent;
  let fixture: ComponentFixture<OwnerMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
