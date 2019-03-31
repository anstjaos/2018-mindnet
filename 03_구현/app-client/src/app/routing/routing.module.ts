import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainContainerComponent } from '../main-container/main-container.component';
import { MemberMainContainerComponent } from '../member-main-container/member-main-container.component';
import { MemberInfoContainerComponent } from '../member-info-container/member-info-container.component';
import { MindmapContainerComponent } from '../mindmap-container/mindmap-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainContainerComponent },
  { path: 'member-main', component: MemberMainContainerComponent },
  { path: 'member-info', component: MemberInfoContainerComponent },
  { path: 'mindmap/:id', component: MindmapContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
