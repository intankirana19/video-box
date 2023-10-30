import { UserInterface } from "./user.interface";

export interface VideoInterface {
    id: string;
    title: string;
    description?: string;
    createdDate: string;
    author: UserInterface;
    previewUrl: string;
    url: string
}