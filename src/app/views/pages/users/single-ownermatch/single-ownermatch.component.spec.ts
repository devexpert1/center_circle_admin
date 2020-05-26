import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOwnermatchComponent } from './single-ownermatch.component';

describe('SingleOwnermatchComponent', () => {
  let component: SingleOwnermatchComponent;
  let fixture: ComponentFixture<SingleOwnermatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleOwnermatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleOwnermatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
