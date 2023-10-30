import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VideoInterface } from 'src/shared/interfaces/videos.interface';
import { VideosService } from 'src/shared/services/videos.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  destroyRef$ = inject(DestroyRef);

  @Input() datas: VideoInterface[] = [];
  @Output() onClickEmitter: EventEmitter<any> = new EventEmitter<any>();

  onClick($event: string) {
    this.onClickEmitter.emit($event);
  }
}
