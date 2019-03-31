import { Component, OnInit, ComponentRef, ViewChild, ElementRef, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Idea } from '../model/idea';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import { IdeaService } from '../service/idea.service';

import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Caption } from '../model/caption';
import { CaptionService } from '../service/caption.service';
import { Filter } from '../model/filter';
import { LoginService } from '../service/login.service';
import { NgForm } from '@angular/forms';
import { Recommend } from '../model/recommend';
const ENTER = 13;

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css'],
})


export class IdeaComponent implements OnInit {
  @ViewChild('frame') frame: ElementRef;
  @ViewChild('content') content: ElementRef;

  @Input() idea: Idea;
  @Input() isEditor: boolean;
  @Output() moveEmitter: EventEmitter<any>;
  @Output() dragBeginEmitter: EventEmitter<any>;
  @Output() focusEmitter: EventEmitter<any>;
  @Output() saveEmitter: EventEmitter<any>;
  @Output() resizeEmitter: EventEmitter<any>;

  private $frame;
  private _position; // position bind
  private buttonDisplay = 'none';

  _isSelected;
  private _isEditing;
  private _isChanged;
  private _captionList: Caption[];
  private _recommendList: Recommend[];

  modalRef: NgbModalRef;

  constructor(private _ideaService: IdeaService, private element: ElementRef, public sanitizer: DomSanitizer, private _loginService: LoginService, private _captionService: CaptionService, private _modalService: NgbModal) {
    this.moveEmitter = new EventEmitter<any>();
    this.dragBeginEmitter = new EventEmitter<any>();
    this.focusEmitter = new EventEmitter<any>();
    this.saveEmitter = new EventEmitter<any>();

    this._isSelected = false;
    this._isEditing = false;
    this._isChanged = false;

    this._captionList = Array(0);
    this._recommendList = Array(0);
  }

  ngOnInit() {
    this.$frame = $(this.frame.nativeElement);

    this._position = { x: this.idea.position.x, y: this.idea.position.y };
  }

  ngAfterViewChecked() {
    // 글자칠때마다 요청함 -> 형태소분석도 이뤄짐 -> 5000번 금방채울듯
    if (this._isChanged) {
      setTimeout(() => {
        this.calcSize();
        // this.saveIdea();
      }, 50);
    }
  }

  // event
  onMoving(event) {
    if (!this.isEditor)
      return;

    //this._isChanged = true;
    this.idea.position.x += event.x - this.idea.position.x;
    this.idea.position.y += event.y - this.idea.position.y;

    this.moveEmitter.emit(this);
  }

  onDragBegin(event) {
    if (!this.isEditor)
      return;

    this.buttonDisplay = 'block'; // 캡션버튼 보이기

    this.setFocus(true);
    this.dragBeginEmitter.emit(this);
  }

  onDragEnd(event) {
    if (!this.isEditor)
      return;

    this.setFocus(true);
    this.change();
    this.saveIdea();
  }

  onDblClick(event) {
    if (!this.isEditor)
      return;

    this.setEditable();
  }

  onMouseDown(event) {
    event.stopPropagation();
  }

  // content change event
  onKeyUp(event) {
    this._isChanged = true;
    //this.calcSize();

    //this.moveEmitter.emit(this);
  }

  onKeyDown(event) {
    if(event.keyCode === ENTER && event.shiftKey){
    }

    if (event.keyCode === ENTER && !event.shiftKey)
      this.setUneditable();
  }
  onInput(e){
    console.log(e.target.innerText);
  }
  setEditable() {
    this._isEditing = true;

    this.content.nativeElement.contentEditable = 'true';
    this.content.nativeElement.style.cursor = 'text';
    this.content.nativeElement.focus();
  }

  setUneditable() {
    this._isEditing = false;

    //this.idea.content = this.content.nativeElement.innerText;
    console.log( this.content.nativeElement);
    console.log( this.content.nativeElement.innerText[0]);
    this.content.nativeElement.contentEditable = 'false';
    this.content.nativeElement.style.cursor = 'pointer';
    this.idea.content = this.content.nativeElement.innerText;
    
    this.change();
    this.saveIdea();
  }

  calcSize() {
    if (this.idea.width !== this.$frame.width() + 24 || this.idea.height !== this.$frame.height() + 24) {
      this.idea.width = this.$frame.width() + 24;
      this.idea.height = this.$frame.height() + 24;
      this.moveEmitter.emit(this);

      if (this._isSelected)
        this.setFocus(true);
    }
  }

  setFocus(focus) {
    this._isSelected = focus;
    if (!this._isSelected) {
      this.setUneditable();
      //this.saveIdea();
      this.buttonDisplay = 'none'; // 캡션버튼 숨기기
    }

    this.focusEmitter.emit(focus);
  }

  change() {
    this._isChanged = true;
  }

  saveIdea() {
    if (this._isChanged) {
      this._isChanged = false;
      this._ideaService.update(this.idea)
        .subscribe((res) => {
          console.log("아이디어 저장");
        });
      this.saveEmitter.emit();
    }
  }

  getIsSelected() {
    return this._isSelected;
  }


  captionOpen(content) {
    this.refreshCaption();
    this.modalRef = this._modalService.open(content, { centered: true });
    let filter: Filter = new Filter();
  }

  recommendOpen(content) {
    let filter: Filter = new Filter();
    filter.addQueryElement('_id', this.idea._id);
    this._ideaService.recommend(filter)
      .subscribe((res) => {
        console.log(res);
        this._recommendList = res;
        //this._recommendList;
      });

    this.modalRef = this._modalService.open(content, { centered: true });
  }

  captionClose() {
    this.modalRef.close();
    this.buttonDisplay = 'none'; // 캡션버튼 숨기기
  }


  recommendClose() {
    this.modalRef.close();
    this.buttonDisplay = 'none'; // 캡션버튼 숨기기
  }

  selectRecommend(content) {
    console.log(content);
    this.modalRef.close();
  }


  refreshCaption() {
    let filter: Filter = new Filter();
    filter.addQueryElement('idea_id', this.idea._id);

    this._captionService.getCaption(filter)
      .subscribe((caption) => this._captionList = caption);
  }


  addCaption(f: NgForm) {
    console.log(f);
    let caption = new Caption();
    console.log(f.value.input);
    caption.content = f.value.input;
    caption.idea_id = this.idea._id;
    caption.writer = this._loginService.getMember().id;
    console.log(caption);
    this._captionService.create(caption)
      .subscribe((res) => {
        this.refreshCaption();
      });
    var s = document.getElementById("input");
    s.focus();
  }

  removeCaption(caption) {
    this._captionService.delete(caption._id)
      .subscribe((res) => {
        console.log("코멘트 삭제");
        this.refreshCaption();
      });
  }
}
