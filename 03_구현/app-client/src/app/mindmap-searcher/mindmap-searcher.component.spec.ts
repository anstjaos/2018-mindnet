import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapSearcherComponent } from './mindmap-searcher.component';

describe('MindmapSearcherComponent', () => {
  let component: MindmapSearcherComponent;
  let fixture: ComponentFixture<MindmapSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindmapSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
