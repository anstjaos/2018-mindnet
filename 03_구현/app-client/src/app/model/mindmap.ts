export class Mindmap {
    _id: string;
    name: string;
    scope: boolean;
    ctime: Date;
    mtime: Date;
    owner: string;
    editors: Array<string>;

    constructor() {
        this.name = '';
        this.scope = true;
    }
}