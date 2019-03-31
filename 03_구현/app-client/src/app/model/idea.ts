import { Position } from './position';

export class Idea {
    _id: string;
    content: string;
    keywords: Array<string>;
    image: string;
    video: string;
    font: string;
    fsize: number;
    fcolor: string;
    bold: string;
    tilt: string;
    crossline: string;
    bgstyle: string;
    bgcolor: string;
    position: Position;
    width: number;
    height: number;
    creator: string;
    mindmap_id: string;
    
    constructor() {
        
    }
}