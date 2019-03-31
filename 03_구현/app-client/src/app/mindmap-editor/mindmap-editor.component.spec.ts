import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapEditorComponent } from './mindmap-editor.component';

describe('MindmapEditorComponent', () => {
  let component: MindmapEditorComponent;
  let fixture: ComponentFixture<MindmapEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindmapEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
