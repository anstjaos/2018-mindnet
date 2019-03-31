import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaColorTableComponent } from './idea-color-table.component';

describe('ColorTableComponent', () => {
  let component: IdeaColorTableComponent;
  let fixture: ComponentFixture<IdeaColorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaColorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaColorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
