import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMindmapListComponent } from './member-mindmap-list.component';

describe('MemberMindmapListComponent', () => {
  let component: MemberMindmapListComponent;
  let fixture: ComponentFixture<MemberMindmapListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMindmapListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMindmapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
