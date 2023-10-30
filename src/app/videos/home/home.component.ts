import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { UrlPath } from 'src/shared/constants/url-path';
import { VideoInterface } from 'src/shared/interfaces/videos.interface';
import { VideosService } from 'src/shared/services/videos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  destroyRef$ = inject(DestroyRef);

  videoList: VideoInterface[] = [];

  isGrid: boolean = true;

  constructor(
    private videosService: VideosService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getVideoList();
  }

  getVideoList() {
    this.videosService.getVideoList()
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe(response => {
      this.videoList = response;
    });
  }

  chooseView(type: string) {
    if ( type === 'grid') {
      this.isGrid = true;
    } else {
      this.isGrid = false;
    }
  }

  navigateToVideoDetail($event: any) {
    this.router.navigate([UrlPath.videos + '/' + $event]);
  }
}
