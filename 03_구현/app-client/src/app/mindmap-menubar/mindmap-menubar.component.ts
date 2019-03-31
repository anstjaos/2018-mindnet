import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IdeaService } from '../service/idea.service';
import { BranchService } from '../service/branch.service';
import { Filter } from '../model/filter';

@Component({
  selector: 'app-mindmap-menubar',
  templateUrl: './mindmap-menubar.component.html',
  styleUrls: ['./mindmap-menubar.component.css']
})
export class MindmapMenubarComponent implements OnInit {
  @Input() name: string;
  @Input() isEditor: boolean;
  @Output() mindmapSeacherOpenEmitter: EventEmitter<any>;
  @Output() mindmapCoopOpenEmitter : EventEmitter<any>;
  @Output() mindmapFormOpenEmitter: EventEmitter<any>;
  @Output() ideaAddEmitter: EventEmitter<any>;
  @Output() ideaDeleteEmitter: EventEmitter<any>;

  constructor(private _ideaService : IdeaService, private _branchService : BranchService) {
    this.mindmapSeacherOpenEmitter = new EventEmitter<any>();
    this.mindmapCoopOpenEmitter = new EventEmitter<any>();
    this.mindmapFormOpenEmitter = new EventEmitter<any>();
    this.ideaAddEmitter = new EventEmitter<any>();
    this.ideaDeleteEmitter = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  openMindmapForm() {
    console.log("openForm");
    this.mindmapFormOpenEmitter.emit();
  }

  openMindmapSearcher() {
    this.mindmapSeacherOpenEmitter.emit();
  }

  openMindmapCoop(){
    this.mindmapCoopOpenEmitter.emit();
  }

  addIdea() {
    this.ideaAddEmitter.emit();
  }

  deleteIdea() {
    this.ideaDeleteEmitter.emit();
  }

  recommendIdea(){
    console.log("hi");
  }
}
