import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAllItemComponent } from './support-all-item.component';

describe('SupportAllItemComponent', () => {
  let component: SupportAllItemComponent;
  let fixture: ComponentFixture<SupportAllItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportAllItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportAllItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
