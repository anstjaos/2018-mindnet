import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mindmap } from '../model/mindmap';
import { Filter } from '../model/filter';
import { MindmapService } from '../service/mindmap.service';
import { LoginService } from '../service/login.service';

import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import 'rxjs/add/operator/takeWhile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-mindmap-list',
  templateUrl: './member-mindmap-list.component.html',
  styleUrls: ['./member-mindmap-list.component.css']
})
export class MemberMindmapListComponent implements OnInit {
  modalRef: NgbModalRef;

  private _mindmapList: Mindmap[];
  private _current: Mindmap;

  private alive: boolean;

  constructor(private _loginService: LoginService, private _mindmapService: MindmapService, private _modalService: NgbModal) {
    this.alive = true;
  }

  ngOnInit() {
    this.refreshMindmap();
    IntervalObservable.create(5000)
      .takeWhile(() => this.alive)
      .subscribe(() => this.refreshMindmap());
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  trackByFn(index, item) {
    return item._id;
  }
  
  onMouseEnter(mindmap) {
    this._current = Object.assign({}, mindmap);
  }

  open(content) {
    this.modalRef = this._modalService.open(content, { centered: true });
  }

  removeMindmap() {
    let filter: Filter = new Filter();

    this._mindmapService.delete(this._current._id)
      .subscribe((res) => {
        this.modalRef.close();
        this.refreshMindmap();
      });
  }

  updateMindmap() {
    this._mindmapService.update(this._current)
      .subscribe((res) => {
        this.modalRef.close();
        this.refreshMindmap();
      });
  }

  refreshMindmap() {
    let filter: Filter = new Filter();
    filter.addQueryElement('editors', this._loginService.getMember().id);

    this._mindmapService.getMindmap(filter)
      .subscribe((mindmaps) => this._mindmapList = mindmaps);
  }
}
