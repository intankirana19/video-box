import { Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { VideoInterface } from 'src/shared/interfaces/videos.interface';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  destroyRef$ = inject(DestroyRef);

  @Input() datas: VideoInterface[] = [];
  @Output() onClickEmitter: EventEmitter<any> = new EventEmitter<any>();

  onClick($event: string) {
    this.onClickEmitter.emit($event);
  }
}
