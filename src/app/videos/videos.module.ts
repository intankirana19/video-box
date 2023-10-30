import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { GridComponent } from './grid/grid.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VideosComponent,
    ListComponent,
    DetailComponent,
    HeaderComponent,
    HomeComponent,
    GridComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    VideosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class VideosModule { }
