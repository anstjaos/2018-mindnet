import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapFormComponent } from './mindmap-form.component';

describe('MindmapFormComponent', () => {
  let component: MindmapFormComponent;
  let fixture: ComponentFixture<MindmapFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MindmapFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MindmapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
