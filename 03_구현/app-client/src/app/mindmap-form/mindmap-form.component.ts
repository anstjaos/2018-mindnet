import { Component, ViewChild, ElementRef, OnInit, EventEmitter, trigger, transition, style, animate, state, Input, Output } from '@angular/core';
import { IdeaComponent } from '../idea/idea.component';
import { Idea } from '../model/idea';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Mindmap } from '../model/mindmap';
import { LoginService } from '../service/login.service';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { IdeaService } from '../service/idea.service';
import 'rxjs/add/operator/map';

export class item {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  }
  kind: string;
  snippet: {
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: {
      default: {
        height: Number;
        url: string;
        width: Number;
      }
      medium: {
        height: Number;
        url: string;
        width: Number;
      }
      high: {
        height: Number;
        url: string;
        width: Number;
      }
    }
    title: string;
  }
}


@Component({
  selector: 'app-mindmap-form',
  templateUrl: './mindmap-form.component.html',
  styleUrls: ['./mindmap-form.component.css'],
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


export class MindmapFormComponent implements OnInit {

  yourcontent = "<em>Tooltip</em> <u>with</u> <b>HTML</b>";

  // 동영상
  url: string;
  modalRef: NgbModalRef;
  mindmap: Mindmap;

  private _videoList: item[];

  @ViewChild('videoList') vList: HTMLElement;
  @Input() state: string;
  @Input() left: string;
  @Input() _current: IdeaComponent;
  @Output() mindmapFormCloseEmitter: EventEmitter<any>;
  @Output() mindmapSeacherOpenEmitter: EventEmitter<any>;
  @Output() mindmapRefreshEmitter: EventEmitter<any>;

  set fsize(value) {
    this._current.idea.fsize = parseInt(value);
    this._current.change();
    this._current.saveIdea();
    this._current.calcSize();
  }
  get fsize() {
    return this._current.idea.fsize.toString();
  }

  set font(value) {
    this._current.idea.font = this.fonts.find(font => font.name === value).value;
    this._current.change();
    this._current.saveIdea();
  }
  get font() {
    return this.fonts.find(font => font.value === this._current.idea.font).name;
  }

  set bold(value) {
    var bold = 'normal';

    if (value)
      bold = 'bolder';

    this._current.idea.bold = bold;
    this._current.change();
    this._current.saveIdea();
  }
  get bold() {
    if (this._current.idea.bold === "bolder")
      return true;

    return false;
  }

  set tilt(value) {
    var tilt = 'normal';

    if (value)
      tilt = 'italic';

    this._current.idea.tilt = tilt;
    this._current.change();
    this._current.saveIdea();
  }
  get tilt() {
    if (this._current.idea.tilt === 'italic')
      return true;

    return false;
  }

  set crossline(value) {
    var crossline = 'none';

    if (value)
      crossline = 'line-through';

    this._current.idea.crossline = crossline;
    this._current.change();
    this._current.saveIdea();
  }
  get crossline() {
    if (this._current.idea.crossline === 'line-through')
      return true;

    return false;
  }

  set fcolor(color) {
    this._current.idea.fcolor = color;
    this._current.change();
    this._current.saveIdea();
  }
  get fcolor() {
    return this._current.idea.fcolor;
  }

  set bgcolor(color) {
    this._current.idea.bgcolor = color;
    this._current.change();
    this._current.saveIdea();
  }
  get bgcolor() {
    return this._current.idea.bgcolor;
  }
  fonts: Array<MyMap>;

  constructor(private _ideaService: IdeaService, private _modalService: NgbModal, private http: Http) {
    this.mindmapFormCloseEmitter = new EventEmitter<any>();

    this.fonts = new Array();
    this.fonts.push(new MyMap("돋움", "dotum"));
    this.fonts.push(new MyMap("바탕", "batang"));
    this.fonts.push(new MyMap("굴림", "gulim"));
    this.fonts.push(new MyMap("궁서", "gungsuh"));
    this.fonts.push(new MyMap("돋움체", "dotumche"));
    this.fonts.push(new MyMap("바탕체", "batangche"));
    this.fonts.push(new MyMap("굴림체", "gulimche"));
    this.fonts.push(new MyMap("궁서", "gungsuhche"));
    this.fonts.push(new MyMap("애플명조", "AppleMyungjo"));
    this.fonts.push(new MyMap("애플고딕", "AppleGothic"));
    this.fonts.push(new MyMap("서울체", "Seoul"));
    this.fonts.push(new MyMap("필기", "Pilgi"));
    this.fonts.push(new MyMap("Times", "Times"));
    this.fonts.push(new MyMap("New Century Schoolbook", "New Century Schoolbook"));
    this.fonts.push(new MyMap("Palatino", "Palatino"));
    this.fonts.push(new MyMap("Times New Roman", "Times New Roman"));
    this.fonts.push(new MyMap("Georgia", "Georgia"));
    this.fonts.push(new MyMap("Helvetica", "Helvetica"));
    this.fonts.push(new MyMap("Arial", "Arial"));
    this.fonts.push(new MyMap("Verdana", "Verdana"));
    this.fonts.push(new MyMap("Tahoma", "Tahoma"));
    this.fonts.push(new MyMap("WingDings", "WingDings"));
    this.fonts.push(new MyMap("Symbol", "Symbol"));
    this.fonts.push(new MyMap("Courier New", "Courier New"));
    this.fonts.push(new MyMap("Lucida Console", "Lucida Console"));

  }

  ngOnInit() {

  }

  open(content) {
    this.modalRef = this._modalService.open(content, { centered: true });
  }

  closeMindmapForm() {
    this.mindmapFormCloseEmitter.emit();
  }

  onFileChange(files) {
    let selectedFile: File = files[0];

    const fd = new FormData();
    fd.append('image', selectedFile, selectedFile.name);
    this._ideaService.upload(this._current.idea._id, fd)
      .subscribe((res) => {
        let body = res.text();
        this._current.idea.image = body.toString();
        this._current.change();
      });
  }

  videoSelecet(videoId) {
        this.url = "https://www.youtube.com/embed/" + videoId; // idea.video에 저장
        this._current.idea.video = this.url;
        this._current.change();
        this.modalRef.close('');
  }

  searchVideo(f: NgForm) {
    var url = "https://www.googleapis.com/youtube/v3/search";
    var searchText = f.value.search;
    var key = "AIzaSyAS9T4yLJUsAITddEvAwVIL0SA0TbvBjGo";
    var maxList = 10;
    var response;
    this.http.get(url, {
      params: {
        key: key,
        part: 'snippet',
        snippet: 'title',
        maxResults: 10,
        type: 'video',
        q: searchText
      },
      responseType: 1
    }
    ).subscribe((data) => {
      response = data;
      var iframe;

      this._videoList = response._body.items;
    });
  }

  removeVideo(){
    this._current.idea.video = null;
    this._current.change();
  }

  
  removeImage(){
    this._current.idea.image = null;
    this._current.change();
  }
}

export class MyMap {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}
