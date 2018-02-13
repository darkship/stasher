import { Tag } from './interfaces';
export default class TagModel implements Tag {
    id: string;
    displayId: string;
    latestChangeset: string;
    latestCommit: string;
    hash: string;
    constructor(data?: any);
}
