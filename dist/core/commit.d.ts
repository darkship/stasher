import { Commit } from './interfaces';
import { IClient, RequestOptions } from '../client-base';
import UserModel from './user';
export default class CommitModel implements Commit {
    id: string;
    displayId: string;
    author: UserModel;
    authorTimestamp: number;
    message: string;
    parents: CommitModel[];
    private client;
    private parent;
    href: string;
    constructor(client: IClient, data?: any);
    set_parent(path: string): CommitModel;
    changes(opt?: RequestOptions): any;
    comments(): void;
}
