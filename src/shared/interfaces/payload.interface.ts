export class ReactionPayloadModel {
    videoId: string;
    type: string;
    timeframe: number; 
    dataUri?: string;
}

export class VideoDetailPayloadModel {
    title?: string;
    description?: string;
}