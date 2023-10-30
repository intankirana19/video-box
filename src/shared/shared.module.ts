import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaStreamDirective } from './directives/video.directive';



@NgModule({
  declarations: [
    MediaStreamDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [MediaStreamDirective]
})
export class SharedModule { }
