import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevDailyScrumComponent } from './dev-daily-scrum.component';

describe('DevDailyScrumComponent', () => {
  let component: DevDailyScrumComponent;
  let fixture: ComponentFixture<DevDailyScrumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevDailyScrumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevDailyScrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
