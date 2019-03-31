import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMenubarComponent } from './member-menubar.component';

describe('MemberMenubarComponent', () => {
  let component: MemberMenubarComponent;
  let fixture: ComponentFixture<MemberMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
