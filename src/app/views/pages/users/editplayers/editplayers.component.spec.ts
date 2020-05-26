import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditplayersComponent } from './editplayers.component';

describe('EditplayersComponent', () => {
  let component: EditplayersComponent;
  let fixture: ComponentFixture<EditplayersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditplayersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditplayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
