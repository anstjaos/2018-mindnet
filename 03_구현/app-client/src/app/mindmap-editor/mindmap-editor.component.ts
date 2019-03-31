import { Component, OnInit,Input, Output, EventEmitter, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { IdeaComponent } from '../idea/idea.component';
import { BranchComponent } from '../branch/branch.component';
import { Branch } from '../model/branch';
import { Idea } from '../model/idea';
import { Filter } from '../model/filter';
import { LoginService } from '../service/login.service';
import { IdeaService } from '../service/idea.service';
import { BranchService } from '../service/branch.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import { Mindmap } from '../model/mindmap';
import { MindmapService } from '../service/mindmap.service';

@Component({
  selector: 'app-mindmap-editor',
  templateUrl: './mindmap-editor.component.html',
  styleUrls: ['./mindmap-editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush  
})
export class MindmapEditorComponent implements OnInit {
  private _mindmapSearcherState: string;

  @Input() formState : string;
  @ViewChildren(BranchComponent) branches: BranchComponent[];
  @ViewChildren(IdeaComponent) ideas: IdeaComponent[];

  // drag event
  private $canvas_container;
  private _isClicked: boolean;
  private _preScroll;
  private _curScroll;

  // data
  private _mindmap: Mindmap;
  private _ideaList: Idea[];
  private _branchList: Branch[];
  private _current: IdeaComponent;

  private _isEditor: boolean = false;

  constructor(private _router: Router, private _loginService: LoginService, private _ideaService: IdeaService, private _branchService: BranchService, private _mindmapService: MindmapService, private _route: ActivatedRoute) {
    this._isClicked = false;

    this._mindmap = new Mindmap();
    this.loadMindmap();
  }

  ngOnInit() {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this._router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this._router.navigated = false;
        window.scrollTo(0, 0);
      }
    });

    this.$canvas_container = $('#canvas_container');
    this.refreshIdeas();
  }

  ngAfterViewInit() {
    // cavas initialization
    setTimeout(() => {
      this._curScroll = { x: this._ideaList[0].position.x + (this._ideaList[0].width / 2) - this.$canvas_container.width() / 2, y: this._ideaList[0].position.y + (this._ideaList[0].height / 2) - this.$canvas_container.height() / 2 }
      this.$canvas_container.scrollLeft(this._curScroll.x);
      this.$canvas_container.scrollTop(this._curScroll.y);
    }, 100);
  }

  ngAfterViewChecked(){
    //this.bindingBranch();
  }

  trackByFn(index, item) {
    return item._id;
  }

  // idea event
  dragBeginIdea(event) {
    if (!this._isEditor)
      return;

    if (this._current != null && this._current !== event) {
      this._current.setFocus(false);
    }

    this._current = event;
  }

  // brach event
  movingBranch() {
    if (this._current == null)
      return;

    this._current.setUneditable();
  }

  // 아직 안고침
  rearrangeScroll(pos) {
    if (this._curScroll.x + this.$canvas_container.width() < pos.x || this._curScroll.x > pos.x) {
      this._curScroll.x = pos.x - (this.$canvas_container.width() / 2);
      this._curScroll.y = pos.y - (this.$canvas_container.height() / 2);
    }

    this.$canvas_container.scrollLeft(this._curScroll.x);
    this.$canvas_container.scrollTop(this._curScroll.y);
  }

  // canvas event
  onClick(event) {
  }

  onMouseDown(event) {
    if (this._current != null && this.formState != "open") {
      this._current.setFocus(false);
      this._current = null;
    }

    this._isClicked = true;
    this._preScroll = { x: event.pageX, y: event.pageY }

    event.preventDefault();
  }

  onMouseUp(event) {
    this._isClicked = false;
  }

  onMouseMove(event) {
    if (!this._isClicked)
      return;

    this._curScroll = { x: this.$canvas_container.scrollLeft() + (this._preScroll.x - event.pageX), y: this.$canvas_container.scrollTop() + (this._preScroll.y - event.pageY) };
    this._preScroll = { x: event.pageX, y: event.pageY }

    this.$canvas_container.scrollTop(this._curScroll.y);
    this.$canvas_container.scrollLeft(this._curScroll.x);
  }

  // prevent out of mouse
  onMouseOut(event) {
    this._isClicked = false;
  }

  addIdea() {
    if (this._current === null)
      return;

    this._current.setUneditable();

    let idea: Idea = new Idea();
    idea.position = {
      x: this._current.idea.position.x + this._current.idea.width + 50,
      y: this._current.idea.position.y
    }
    idea.creator = this._loginService.getMember().id;
    idea.mindmap_id = this._route.snapshot.paramMap.get('id');

    let branch: Branch = new Branch();
    branch.source = this._current.idea._id;
    branch.P1 = {
      x: this._current.idea.position.x + this._current.idea.width / 2,
      y: this._current.idea.position.y + this._current.idea.height / 2
    };
    branch.C1 = {
      x: branch.P1.x - 5,
      y: branch.P1.y + 80
    };
    branch.mindmap_id = this._route.snapshot.paramMap.get('id');

    this._ideaService.create(idea)
      .subscribe((idea) => {
        branch.destination = idea._id;
        branch.P2 = {
          x: idea.position.x + idea.width / 2,
          y: idea.position.y + idea.height / 2
        };
        branch.C2 = {
          x: branch.P2.x - 5,
          y: branch.P2.y + 80
        };

        this._branchService.create(branch)
          .subscribe((res) => {
            this.refreshIdeas();
          })
      });
  }

  deleteIdea() {
    if (this._current === null || this._current.idea._id === this._ideaList[0]._id || !this._current.getIsSelected())
      return;

    this._current.saveIdea();

    this._ideaService.delete(this._current.idea._id)
      .subscribe((res) => {
        setTimeout(() => {
          console.log("아이디어 삭제");
          this._current = null;
          this.refreshIdeas();
        }, 200)
      })
  }

  loadMindmap() {
    let filter: Filter = new Filter();
    filter.addQueryElement('_id', this._route.snapshot.paramMap.get('id'));

    this._mindmapService.getMindmap(filter)
      .subscribe((mindmap) => {
        this._mindmap = mindmap[0];
        this._mindmap.editors.forEach((id) => {
          if (this._loginService.getMember().id === id)
            this._isEditor = true;
        });
      });
  }

  refreshIdeas() {
    let filter: Filter = new Filter();
    filter.addQueryElement('mindmap_id', this._route.snapshot.paramMap.get('id'));

    this._ideaService.getIdea(filter)
      .subscribe((ideas) => { this._ideaList = ideas; });

    this._branchService.getBranch(filter)
      .subscribe((branches) => { this._branchList = branches; });

    setTimeout(() => {
      this.bindingBranch();
    }, 1000);
    
  }

  // subscribe
  private bindingBranch() {
    this.branches.forEach((branchComp) => {
      this.ideas.forEach((ideaComp) => {
        if (branchComp.branch.source === ideaComp.idea._id) {
          branchComp.srcSubscribers.push(ideaComp.moveEmitter.subscribe(event => {
            let branch: Branch = branchComp.branch;
            let preP1 = branch.P1;
            branch.P1 = {
              x: event.idea.position.x + event.idea.width / 2,
              y: event.idea.position.y + event.idea.height / 2
            };
            branch.C1 = {
              x: branch.C1.x + (branch.P1.x - preP1.x),
              y: branch.C1.y + (branch.P1.y - preP1.y)
            };

            branchComp.refreshHdlPosition();

            branchComp.setFocus(false);
            //branchComp.remove();
            branchComp.drawBranch();
          }));

          branchComp.srcSubscribers.push(ideaComp.focusEmitter.subscribe((event) => {
            branchComp.setFocus(event);
          }));

          branchComp.srcSubscribers.push(ideaComp.saveEmitter.subscribe(() => {
            branchComp.saveBranch();
          }));
        }

        if (branchComp.branch.destination === ideaComp.idea._id) {
          branchComp.dstSubscribers.push(ideaComp.moveEmitter.subscribe(event => {
            let branch: Branch = branchComp.branch;
            let preP2 = branch.P2;
            branch.P2 = {
              x: event.idea.position.x + event.idea.width / 2,
              y: event.idea.position.y + event.idea.height / 2
            };
            branch.C2 = {
              x: branch.C2.x + (branch.P2.x - preP2.x),
              y: branch.C2.y + (branch.P2.y - preP2.y)
            };

            branchComp.refreshHdlPosition();

            branchComp.setFocus(false);
            //branchComp.remove();
            branchComp.drawBranch();
          }));

          branchComp.dstSubscribers.push(ideaComp.focusEmitter.subscribe((event) => {
            branchComp.setFocus(event);
          }));

          branchComp.dstSubscribers.push(ideaComp.saveEmitter.subscribe(() => {
            branchComp.saveBranch();
          }));
        }
      })
    });
  }
}
