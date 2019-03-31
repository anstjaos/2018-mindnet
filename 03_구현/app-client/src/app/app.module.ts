import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './routing/routing.module';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ScrollbarModule } from 'ngx-scrollbar';
import { AngularDraggableModule } from 'angular2-draggable';

import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { MemberRegisterComponent } from './member-register/member-register.component';
import { MemberMainContainerComponent } from './member-main-container/member-main-container.component';
import { MemberMenubarComponent } from './member-menubar/member-menubar.component';
import { MemberMindmapListComponent } from './member-mindmap-list/member-mindmap-list.component';
import { MindmapSearcherComponent } from './mindmap-searcher/mindmap-searcher.component';
import { MemberInfoContainerComponent } from './member-info-container/member-info-container.component';
import { MindmapContainerComponent } from './mindmap-container/mindmap-container.component';
import { MindmapEditorComponent } from './mindmap-editor/mindmap-editor.component';
import { MindmapMenubarComponent } from './mindmap-menubar/mindmap-menubar.component';
import { IdeaComponent } from './idea/idea.component';
import { BranchComponent } from './branch/branch.component';
import { MindmapFormComponent } from './mindmap-form/mindmap-form.component';
import { MindmapCoopComponent } from './mindmap-coop/mindmap-coop.component';
import { IdeaColorTableComponent } from './idea-color-table/idea-color-table.component';
import { BranchStyleTableComponent } from './branch-style-table/branch-style-table.component';

import { LoginService } from './service/login.service';
import { MemberService } from './service/member.service';
import { MindmapService } from './service/mindmap.service';
import { IdeaService } from './service/idea.service';
import { BranchService } from './service/branch.service';
import { CommentService } from './service/comment.service';
import { CaptionService } from './service/caption.service';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    LoginManagerComponent,
    MainContainerComponent,
    MemberRegisterComponent,
    MemberMainContainerComponent,
    MemberMenubarComponent,
    MemberMindmapListComponent,
    MindmapSearcherComponent,
    MemberInfoContainerComponent,
    MindmapContainerComponent,
    MindmapEditorComponent,
    MindmapMenubarComponent,
    IdeaComponent,
    BranchComponent,
    MindmapFormComponent,
    MindmapCoopComponent,
    IdeaColorTableComponent,
    BranchStyleTableComponent,
    SafePipe    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    RoutingModule,
    UiSwitchModule,
    ScrollbarModule,
    AngularDraggableModule // ngDraggable
  ],
  providers: [LoginService, MemberService, MindmapService, IdeaService, BranchService, CommentService, CaptionService],
  bootstrap: [AppComponent],
  entryComponents: [IdeaComponent, BranchComponent],
})
export class AppModule { }
