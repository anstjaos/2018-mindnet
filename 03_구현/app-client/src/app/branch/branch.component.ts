import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Branch } from '../model/branch';
import * as d3 from "d3";
import { BranchService } from '../service/branch.service';
import { Subscriber } from 'rxjs';
import { BranchStyleTableComponent } from '../branch-style-table/branch-style-table.component';

const hdlWidth = 5;
const hdlHeight = 5;

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})

export class BranchComponent implements OnInit {
  @Input() branch: Branch;
  @Output() moveEmitter: EventEmitter<any>;
  //@ViewChild('option') option: ElementRef;

  srcSubscribers: Subscriber<any>[] = [];
  dstSubscribers: Subscriber<any>[] = [];

  private _dblClicked;
  private _isFocused;
  private _position_h1;
  private _position_h2;

  private _branch;
  private _hdl1;
  private _hdl2;

  private _position_style;

  constructor(private _branchService: BranchService) {
    this.moveEmitter = new EventEmitter<any>();

    this._isFocused = false;
    this._dblClicked = false;
  }

  ngOnInit() {
    this.refreshHdlPosition();
    this.drawBranch();
  }

  ngOnDestroy(): void {
    // remove svg drawing
    this.remove();
    // unsubscribe about linked idea
    this.srcSubscribers.forEach((subscriber) => {
      subscriber.unsubscribe();
    })
    this.dstSubscribers.forEach((subscriber) => {
      subscriber.unsubscribe();
    })
  }

  // event
  onDblClick(event) {
    this._dblClicked = true;
    this._position_style =  {x: event.layerX, y: event.layerY}; 
  }

  onMouseDown(event) {
    event.stopPropagation();
  }

  onMovingHdl1(event) {
    this.branch.C1.x += event.x - this.branch.C1.x;
    this.branch.C1.y += event.y - this.branch.C1.y;

    this.drawBranch();
    this.drawHdlLine();

    this.moveEmitter.emit();
  }

  onMovingHdl2(event) {
    this.branch.C2.x += event.x - this.branch.C2.x;
    this.branch.C2.y += event.y - this.branch.C2.y;

    this.drawBranch();
    this.drawHdlLine();

    this.moveEmitter.emit();
  }

  onDragEnd(event) {
    this.saveBranch();
  }

  remove() {
    this.removeHdlLine();
    this.removeBranch();
  }

  drawBranch() {
    this.removeBranch();
    this._dblClicked = false;

    let svg = d3.select('svg');

    let P1 = this.branch.P1;
    let P2 = { x: this.branch.C1.x + hdlWidth, y: this.branch.C1.y + hdlHeight };
    let P3 = { x: this.branch.C2.x + hdlWidth, y: this.branch.C2.y + hdlHeight };
    let P4 = this.branch.P2;

    let str = 'M' + P1.x.toString() + " " + P1.y.toString() + " C " + P2.x.toString() + ' ' + P2.y.toString() + ', ' + P3.x.toString()
      + ' ' + P3.y.toString() + ' ' + P4.x.toString() + ' ' + P4.y.toString();

    this._branch = svg.append("path")
      .style("stroke", 'black')
      .style("fill", 'transparent')
      .style("stroke-dasharray", this.branch.style)
      .attr("d", str);
  }

  drawHdlLine() {
    this.removeHdlLine();

    let svg = d3.select('svg');

    let P1 = this.branch.P1;
    let P2 = { x: this.branch.C1.x + hdlWidth, y: this.branch.C1.y + hdlHeight };
    let P3 = { x: this.branch.C2.x + hdlWidth, y: this.branch.C2.y + hdlHeight };
    let P4 = this.branch.P2;

    let str = 'M' + P1.x.toString() + " " + P1.y.toString() + " L " + P2.x.toString() + " " + P2.y.toString();

    this._hdl1 = svg.append('path')
      .style('stroke', 'black')
      .style('fill', 'transparent')
      .style('stroke-dasharray', '5 5')
      .attr("d", str);

    str = 'M' + P3.x.toString() + " " + P3.y.toString() + " L " + P4.x.toString() + " " + P4.y.toString();

    this._hdl2 = svg.append('path')
      .style('stroke', 'black')
      .style('fill', 'transparent')
      .style('stroke-dasharray', '5 5')
      .attr("d", str);
  }

  removeBranch() {
    if (this._branch != null)
      this._branch.remove();
  }

  removeHdlLine() {
    if (this._hdl1 != null && this._hdl2 != null) {
      this._hdl1.remove();
      this._hdl2.remove();
    }
  }

  setFocus(focus) {
    this._isFocused = focus;
    if (focus)
      this.drawHdlLine();
    else{
      this.removeHdlLine();
      this._dblClicked = false;
    }
  }

  refreshHdlPosition() {
    this._position_h1 = this.branch.C1;
    this._position_h2 = this.branch.C2;
  }

  saveBranch() {
    this._branchService.update(this.branch)
      .subscribe((res) => {
        console.log("가지 저장");
      });
  }

  changeLineStyle(style: string) {
    this.branch.style = style;
    console.log("this.branch.style : " + this.branch.style);
    this.drawBranch();
    this.saveBranch();
  }
}
