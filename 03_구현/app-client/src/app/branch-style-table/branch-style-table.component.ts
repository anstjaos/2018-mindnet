import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-branch-style-table',
  templateUrl: './branch-style-table.component.html',
  styleUrls: ['./branch-style-table.component.css']
})
export class BranchStyleTableComponent implements OnInit {

  private _styles = [
    '', '5,5', "10,10", "20,10,5,5,5,10"
  ];

  private _curStyle;

  @Output() lineStyleChange: EventEmitter<string>;

  constructor() {
    this.lineStyleChange = new EventEmitter();
  }

  ngOnInit() {
  }

  changeLineStyle(style: string) {
    console.log(style);
    this.lineStyleChange.emit(style);
  }
}
