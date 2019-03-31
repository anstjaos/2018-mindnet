import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberInfoContainerComponent } from './member-info-container.component';

describe('MemberInfoContainerComponent', () => {
  let component: MemberInfoContainerComponent;
  let fixture: ComponentFixture<MemberInfoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberInfoContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
