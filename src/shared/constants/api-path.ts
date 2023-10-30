import { environment } from "src/environments/environment";

export const API_URL = environment.apiUrl;
export const API_USER = `${API_URL}/users/self`;
export const API_VIDEOS = `${API_URL}/videos`;
export const API_VIDEO_DETAIL_BY_ID = (videoId:string)=> `${API_VIDEOS}/${videoId}`;
export const API_VIDEO_REACTION_BY_ID = (videoId:string)=> `${API_VIDEOS}/${videoId}/reactions`;
