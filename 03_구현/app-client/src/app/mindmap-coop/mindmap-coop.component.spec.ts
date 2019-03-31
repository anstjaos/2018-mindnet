import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapCoopComponent } from './mindmap-coop.component';

describe('MindmapCoopComponent', () => {
  let component: MindmapCoopComponent;
  let fixture: ComponentFixture<MindmapCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindmapCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
