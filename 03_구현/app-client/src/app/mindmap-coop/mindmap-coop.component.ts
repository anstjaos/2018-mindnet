import { Component, OnInit, Output, ViewChild, ElementRef, EventEmitter, trigger, transition, style, animate, state, Input } from '@angular/core';
import { Filter } from '../model/filter';
import { MemberService } from '../service/member.service';
import { Member } from '../model/member';
import { MindmapService } from '../service/mindmap.service';
import { Mindmap } from '../model/mindmap';
import { Comment } from '../model/comment';
import { CommentService } from '../service/comment.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { LoginService } from '../service/login.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-mindmap-coop',
  templateUrl: './mindmap-coop.component.html',
  styleUrls: ['./mindmap-coop.component.css'],
  animations: [
    trigger('myAnimation', [
      state('open', style({ opacity: 1, transform: 'translateX(0)' })),
      state('right-close', style({ opacity: 0, transform: 'translateX(100%)', display: 'none' })),
      state('left-close', style({ opacity: 0, transform: 'translateX(-100%)', display: 'none' })),
      transition('* => open', animate('300ms')),
      transition('open => *', animate('300ms'))
    ])
  ]
})
export class MindmapCoopComponent implements OnInit {
  @Input() state: string;
  @Input() left: string;
  @Output() mindmapCoopCloseEmitter: EventEmitter<any>;
  @ViewChild('input') insert : ElementRef;

  private _memberEmail: string;
  private _content: string;

  private _memberList: Member[];
  private _coopList: Member[];
  private _commentList: Comment[];

  private _mindmap: Mindmap;


  constructor(private _loginService: LoginService, private _memberService: MemberService, private _mindmapService: MindmapService, private _commentService: CommentService, private _route: ActivatedRoute) {
    this.mindmapCoopCloseEmitter = new EventEmitter<any>();
    this._mindmap = new Mindmap();

    this.loadMindmap();
  }

  ngOnInit() {
    this.refreshCommentList();
    IntervalObservable.create(2500)
      .takeWhile(() => this.state == 'open')
      .subscribe(() => this.refreshCommentList());
  }

  trackByFn(index, item) {
    return item._id;
  }

  searchMember() {
    let filter: Filter = new Filter();
    filter.addQueryElement('id', this._memberEmail, 'like');

    this._memberService.getMember(filter)
      .subscribe((member) => this._memberList = member);
  }

  addCoop(member) {
    for (let i = 0; i < this._mindmap.editors.length; i++)
      if (this._mindmap.editors[i] == member.id)
        return;

    this._mindmap.editors.push(member.id);
    this._mindmapService.update(this._mindmap)
      .subscribe((res) => {
        console.log("협업자 추가");
      });
  }

  removeCoop(editor) {
    let editors: string[] = [];
    this._mindmap.editors.forEach((element) => {
      if (element !== editor)
        editors.push(element);
    });
    this._mindmap.editors = editors;

    this._mindmapService.update(this._mindmap)
      .subscribe((res) => {
        console.log("협업자 삭제");
        this.loadMindmap();
      });

  }

  addComment() {
    let comment: Comment = new Comment();
    comment.content = this.insert.nativeElement.value;
    comment.writer = this._loginService.getMember().id;
    comment.mindmap_id = this._mindmap._id;

    this._commentService.create(comment)
      .subscribe((res) => {
        console.log("코멘트 추가")
        this.refreshCommentList();
      });

      this.insert.nativeElement.value = "";
      document.getElementById('input').focus();
  }

  removeComment(comment) {
    this._commentService.delete(comment._id)
      .subscribe((res) => {
        console.log("코멘트 삭제");
        this.refreshCommentList();
      });
  }

  loadMindmap() {
    let filter: Filter = new Filter();
    filter.addQueryElement('_id', this._route.snapshot.paramMap.get('id'));

    this._mindmapService.getMindmap(filter)
      .subscribe((mindmaps) => {
        this._mindmap = mindmaps[0];
      });
  }

  refreshCommentList() {
    let filter: Filter = new Filter();
    filter.addQueryElement('mindmap_id', this._route.snapshot.paramMap.get('id'));

    this._commentService.getComment(filter)
      .subscribe((comment) => this._commentList = comment);
  }

  closeMindmapCoop() {
    this.mindmapCoopCloseEmitter.emit();
  }
}
