import { Component, OnInit, ViewChild } from '@angular/core';
import { MindmapEditorComponent } from '../mindmap-editor/mindmap-editor.component';

@Component({
  selector: 'app-mindmap-container',
  templateUrl: './mindmap-container.component.html',
  styleUrls: ['./mindmap-container.component.css'],
  host: { style: 'width: 100%' }
})
export class MindmapContainerComponent implements OnInit {
  private _mindmapCoopState: string;
  private _mindmapSearcherState: string;
  private _mindmapFormState: string;

  @ViewChild(MindmapEditorComponent) mindmapEditor: MindmapEditorComponent;

  constructor() {
    this._mindmapSearcherState = 'left-close';
    this._mindmapCoopState = 'left-close';
    this._mindmapFormState = 'left-close';
  }

  ngOnInit() {
  }

  addIdea() {
    this.mindmapEditor.addIdea();
  }

  deleteIdea() {
    this.mindmapEditor.deleteIdea();
  }

  openMindmapSearcher() {
    this._mindmapSearcherState = 'open';
  }

  closeMindmapSearcher() {
    this._mindmapSearcherState = 'left-close';
  }

  openMindmapCoop() {
    this._mindmapCoopState = 'open';
  }

  closeMindmapCoop() {
    this._mindmapCoopState = 'left-close';
  }

  openMindmapForm() {
    this._mindmapFormState = 'open';
  }

  closeMindmapForm() {
    this._mindmapFormState = 'left-close';
  }
}
