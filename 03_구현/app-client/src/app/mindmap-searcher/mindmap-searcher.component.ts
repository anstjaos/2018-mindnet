import { Component, OnInit, Output, EventEmitter, trigger, transition, style, animate, state, Input } from '@angular/core';
import { MindmapService } from '../service/mindmap.service';
import { Filter } from '../model/filter';
import { Mindmap } from '../model/mindmap';

@Component({
  selector: 'app-mindmap-searcher',
  templateUrl: './mindmap-searcher.component.html',
  styleUrls: ['./mindmap-searcher.component.css'],
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
export class MindmapSearcherComponent implements OnInit {
  private _mindmapName: string;
  private _mindmapList: Mindmap[];
  private _current: Mindmap;

  @Input() state: string;
  @Input() left: string;
  @Output() mindmapSearcherCloseEmitter: EventEmitter<any>;

  constructor(private _mindmapService: MindmapService) {
    this.mindmapSearcherCloseEmitter = new EventEmitter<any>();
  }

  ngOnInit() {

  }

  onMouseEnter(mindmap) {
    this._current = Object.assign({}, mindmap);
  }

  closeMindmapSearcher() {
    this.mindmapSearcherCloseEmitter.emit();
  }

  searchMindmap() {
    let filter: Filter = new Filter();
    filter.addQueryElement('name', this._mindmapName, 'like');
    filter.addQueryElement('scope', 'true');

    this._mindmapService.getMindmap(filter)
      .subscribe((mindmaps) => this._mindmapList = mindmaps);
  }
}
