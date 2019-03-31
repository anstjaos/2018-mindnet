import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchStyleTableComponent } from './branch-style-table.component';

describe('BranchColorTableComponent', () => {
  let component: BranchStyleTableComponent;
  let fixture: ComponentFixture<BranchStyleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchStyleTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchStyleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
