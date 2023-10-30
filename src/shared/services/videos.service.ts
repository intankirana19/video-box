import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_VIDEOS, API_VIDEO_DETAIL_BY_ID, API_VIDEO_REACTION_BY_ID} from 'src/shared/constants/api-path';
import { VideoInterface } from 'src/shared/interfaces/videos.interface';
import { ReactionInterface } from '../interfaces/reaction.interface';
import { ReactionPayloadModel, VideoDetailPayloadModel } from '../interfaces/payload.interface';

@Injectable({
  providedIn: 'root'
})
export class VideosService {
  
  constructor(
    public http: HttpClient,
  ) { }

  getVideoList(): Observable<VideoInterface[]> {
    return this.http.get(API_VIDEOS) as Observable<VideoInterface[]>;
  }

  getVideoDetailByID(videoId: string): Observable<VideoInterface> {
    return this.http.get(API_VIDEO_DETAIL_BY_ID(videoId)) as Observable<VideoInterface>;
  }

  getVideoReactionsByVideoID(videoId: string): Observable<ReactionInterface[]> {
    return this.http.get(API_VIDEO_REACTION_BY_ID(videoId)) as Observable<ReactionInterface[]>;
  }

  updateTitle(videoId: string, data: VideoDetailPayloadModel): Observable<VideoInterface> {
    return this.http.patch(API_VIDEO_DETAIL_BY_ID(videoId), data) as Observable<VideoInterface>;
  }

  submitReaction(videoId: string, data: ReactionPayloadModel): Observable<ReactionInterface> {
    return this.http.post(API_VIDEO_REACTION_BY_ID(videoId), data) as Observable<ReactionInterface>;
  }
}
