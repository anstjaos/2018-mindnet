import { Component, OnInit, ViewChild } from '@angular/core';
import { Filter } from '../model/filter';
import { MemberMindmapListComponent } from '../member-mindmap-list/member-mindmap-list.component';

@Component({
  selector: 'app-member-main-container',
  templateUrl: './member-main-container.component.html',
  styleUrls: ['./member-main-container.component.css'],
  host: { style: 'width: 100%' }
})
export class MemberMainContainerComponent implements OnInit {
  private _mindmapSearcherState: string;

  @ViewChild(MemberMindmapListComponent) memberMindmapList: MemberMindmapListComponent;

  constructor() {
    this._mindmapSearcherState = 'right-close';
  }

  ngOnInit() {

  }

  openMindmapSearcher() {
    this._mindmapSearcherState = 'open';
  }

  closeMindmapSearcher() {
    this._mindmapSearcherState = 'right-close';
  }

  refreshMindmapList() {
    this.memberMindmapList.refreshMindmap();
  }
}
