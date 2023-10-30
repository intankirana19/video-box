import { style, transition, animate, trigger } from '@angular/animations';
import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MediaStreamDirective } from 'src/shared/directives/video.directive';
import { ReactionType } from 'src/shared/enums/reaction.enum';
import { ReactionPayloadModel, VideoDetailPayloadModel } from 'src/shared/interfaces/payload.interface';
import { ReactionInterface } from 'src/shared/interfaces/reaction.interface';
import { VideoInterface } from 'src/shared/interfaces/videos.interface';
import { AuthService } from 'src/shared/services/auth.service';
import { VideosService } from 'src/shared/services/videos.service';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('200ms ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1,
  }),
  animate('10s ease-out', style({
    opacity: 0,
    transform: 'translateY(-500%)',
  }))
])

const fadeIn = trigger('fadeIn', [
  enterTransition
]);

const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  animations: [
    fadeIn,
    fadeOut
  ]
})
export class DetailComponent implements OnInit{
  @ViewChild(MediaStreamDirective)
  public mediaStream!: MediaStreamDirective;
  
  destroyRef$ = inject(DestroyRef);

  videoDetail: VideoInterface;
  reactionData: ReactionInterface[] = [];
  reactionType: ReactionType;

  isOwner: boolean = false;
  isSaved: boolean = false;
  showStar: boolean = false;

  videoID: string;
  selectedReaction: string;
  
  title = new FormControl('');

   // videoSrc: SafeUrl;

  constructor(
    private videosService: VideosService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.getVideoId();
  }

  getVideoId() {
    this.activatedRoute.params
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe(response => {
      this.videoID = response['videoId'];
      this.getVideoByID();
    });
  }

  get isTitleChanging() {
    return (this.videoDetail?.title !== this.title.value) && !this.isSaved;
  }

  getVideoByID() {
    this.videosService.getVideoDetailByID(this.videoID)
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe(response => {
      this.videoDetail = response;
      this.isOwner = this.authService.filterVideoOwner(this.videoDetail.author);
      if(this.isOwner) {
        this.title.patchValue(this.videoDetail.title);
      }
      this.getReactions();
      // this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(
      //   this.videoDetail.url
      // );
      // console.log('this.videoDetail', this.videoDetail)
    });
  }

  updateTitle() {
    if(this.title.value) {
      let reqBodyVideoDetail: VideoDetailPayloadModel = new VideoDetailPayloadModel;
      reqBodyVideoDetail.title = this.title.value;

      this.videosService.updateTitle(this.videoID, reqBodyVideoDetail)
      .pipe(takeUntilDestroyed(this.destroyRef$))
      .subscribe(response => {
        if(response) {
          this.isSaved = true;
          this.getVideoByID();
        }
        
      });
    }
    
  }

  getReactions() {
    this.videosService.getVideoReactionsByVideoID(this.videoID)
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe(response => {
      this.reactionData = response;
      // console.log('this.reactionData', this.reactionData)
    });
  }

  addReaction(type: string) {
    let reqBodyReaction: ReactionPayloadModel = new ReactionPayloadModel;
    reqBodyReaction.videoId = this.videoID;
    reqBodyReaction.type = type;
    reqBodyReaction.timeframe = this.mediaStream.getVideoTime();

    if(type === ReactionType.SNAPSHOT) {
      reqBodyReaction.dataUri = this.mediaStream.getSnapshotUrl();
    }

    this.videosService.submitReaction(this.videoID, reqBodyReaction)  
    .pipe(takeUntilDestroyed(this.destroyRef$))
    .subscribe(response => {
      if(response) {
        if (type === ReactionType.STAR) {
          this.showStar = true;
          setTimeout(() => {
            this.showStar = false;
          }, 1000)
        }
        this.getReactions();
      }
      
    });  
  }

  reactionIcon(type: string) {
    return type === ReactionType.STAR ? '../../../assets/svg/light_star.svg' : '../../../assets/svg/light_snapshot.svg';
  }

  reactionDescription(author: string, type: string) {
    return author + (type === ReactionType.STAR ? ' starred the video' : ' created a snapshot');
  }

  // TODO: move to pipe
  getDateTime(timeframe: number) {  
    let date = new Date(0);
    date.setSeconds(Math.round(timeframe*10));
    return date.toISOString().substring(11, 19);
  }

  onClickReaction(reactionID: string, reactionTimeframe: number) {
    this.selectedReaction = reactionID;
    this.mediaStream.chooseVideoReaction(reactionTimeframe);
  }

  isSelectedReaction(reactionId: string) {
    if(this.selectedReaction && this.selectedReaction === reactionId) {
      return 'var(--active-purple)';
    }
    return;
  }
}
