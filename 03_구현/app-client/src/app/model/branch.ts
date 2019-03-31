import { Position } from './position'

export class Branch {
    _id: number;
    source: string;
    destination: string;
    P1: Position;
    P2: Position;
    C1: Position;
    C2: Position;
    style: string;
    color: string;
    mindmap_id: string;
    
    constructor() {

    }
}