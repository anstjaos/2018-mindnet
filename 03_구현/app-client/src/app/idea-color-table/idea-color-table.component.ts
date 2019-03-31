import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-idea-color-table',
  templateUrl: './idea-color-table.component.html',
  styleUrls: ['./idea-color-table.component.css']
})
export class IdeaColorTableComponent implements OnInit {

  private _colors = [
    ['#ffffff', '#dce2e6', '#c3c9cc', '#abb0b3', '#939799', '#626566', '#454a4f', '#282b31', '#000000'],

    ['#a6433a', '#736250', '#80774d', '#468c52', '#438080', '#38628c', '#5e4d80', '#804d66', '#964650'],

    ['#e67c73', '#e69545', '#ffff80', '#a7cc5c', '#6bb3b3', '#33bbff', '#987db3', '#b36b8f', '#be5078'],

    ['#e6d0cf', '#e6d4c3', '#e6e0c3', '#dae6c3', '#c3e6e6', '#c2e2f2', '#d4c3e6', '#e6b8cf', '#faafb4']
  ];

  private _curFcolor: string;
  private _curBgcolor: string;
  private _fmode: boolean;
  private _bgmode: boolean;

  @Output() fcolorChange: EventEmitter<string>;
  @Input()
  set fcolor(color) {
    this._curFcolor = color;
  }
  get fcolor() {
    return this._curFcolor;
  }

  @Output() bgcolorChange: EventEmitter<string>;
  @Input()
  set bgcolor(color) {
    this._curBgcolor = color;
  }
  get bgcolor() {
    return this._curBgcolor;
  }

  constructor() {
    this._fmode = true;
    this._bgmode = false;
    this.fcolorChange = new EventEmitter();
    this.bgcolorChange = new EventEmitter();
  }

  ngOnInit() {
  }

  changeColor(event) {
    if(this._fmode){
      this.fcolor = event.target.dataset.color;
      this.fcolorChange.emit(this.fcolor);
    }

    else{
      this.bgcolor = event.target.dataset.color;
      this.bgcolorChange.emit(this.bgcolor);
    }
  }

  onTextbtnClick(event){
    this._fmode = true;
    this._bgmode = false;
  }

  onBgbtnClick(event){
    this._fmode = false;
    this._bgmode = true;
  }
}
