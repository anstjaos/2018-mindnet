import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMainContainerComponent } from './member-main-container.component';

describe('MemberMainContainerComponent', () => {
  let component: MemberMainContainerComponent;
  let fixture: ComponentFixture<MemberMainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMainContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
