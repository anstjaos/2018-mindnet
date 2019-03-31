import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapMenubarComponent } from './mindmap-menubar.component';

describe('MindmapMenubarComponent', () => {
  let component: MindmapMenubarComponent;
  let fixture: ComponentFixture<MindmapMenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindmapMenubarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapMenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
