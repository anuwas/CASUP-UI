import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSprintComponent } from './dev-sprint.component';

describe('DevSprintComponent', () => {
  let component: DevSprintComponent;
  let fixture: ComponentFixture<DevSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
