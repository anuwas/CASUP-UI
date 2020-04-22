import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevAllItemComponent } from './dev-all-item.component';

describe('DevAllItemComponent', () => {
  let component: DevAllItemComponent;
  let fixture: ComponentFixture<DevAllItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevAllItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevAllItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
