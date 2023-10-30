import { UserInterface } from "./user.interface";

export interface ReactionInterface {
    id: string;
    videoId: string;
    author: UserInterface,
    postedDate?: string;
    createdDate?: string;
    Date: string;
    timeframe: number;
    type: string;
    imageUrl?: string;
}