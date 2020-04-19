import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportActiveItemComponent } from './support-active-item.component';

describe('SupportActiveItemComponent', () => {
  let component: SupportActiveItemComponent;
  let fixture: ComponentFixture<SupportActiveItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportActiveItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportActiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
