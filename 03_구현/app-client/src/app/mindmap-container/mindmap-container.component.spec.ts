import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapContainerComponent } from './mindmap-container.component';

describe('MindmapContainerComponent', () => {
  let component: MindmapContainerComponent;
  let fixture: ComponentFixture<MindmapContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindmapContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
