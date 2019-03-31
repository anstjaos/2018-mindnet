import { Component, OnInit, Output, EventEmitter, trigger, state, transition, style, animate } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mindmap } from '../model/mindmap';
import { LoginService } from '../service/login.service';
import { MindmapService } from '../service/mindmap.service';

@Component({
  selector: 'app-member-menubar',
  templateUrl: './member-menubar.component.html',
  styleUrls: ['./member-menubar.component.css'],
})
export class MemberMenubarComponent implements OnInit {
  modalRef: NgbModalRef;
  mindmap: Mindmap;

  @Output() mindmapSeacherOpenEmitter: EventEmitter<any>;
  @Output() mindmapRefreshEmitter: EventEmitter<any>;

  constructor(private _loginService: LoginService, private _mindmapService: MindmapService, private _modalService: NgbModal) {
    this.mindmap = new Mindmap();
    this.mindmapSeacherOpenEmitter = new EventEmitter<any>();
    this.mindmapRefreshEmitter = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  open(content) {
    this.modalRef = this._modalService.open(content, { centered: true });
  }

  openMindmapSearcher() {
    this.mindmapSeacherOpenEmitter.emit();
  }

  createMindmap() {
    this.mindmap.owner = this._loginService.getMember().id;
    this.mindmap.editors = new Array<string>(this._loginService.getMember().id);

    this._mindmapService.create(this.mindmap)
      .subscribe((res) => {
        if(res.status == 201) {
          this.mindmapRefreshEmitter.emit();
          this.modalRef.close();
          this.mindmap = new Mindmap();
        }
      });
  }
}
