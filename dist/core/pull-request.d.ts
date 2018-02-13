import { PullRequest, BranchReference } from './interfaces';
import { IClient, RequestOptions } from '../client-base';
import EntityModel from './entity';
import ParticipantModel from './participant';
export interface CommitsOptions extends RequestOptions {
    withCounts?: boolean;
}
export interface ChangesOptions extends RequestOptions {
    withComments?: boolean;
}
export default class PullRequestModel extends EntityModel implements PullRequest {
    id: number;
    version: number;
    title: string;
    descripion: string;
    state: string;
    open: boolean;
    closed: boolean;
    createdDate: number;
    updatedDate: number;
    fromRef: BranchReference;
    toRef: BranchReference;
    locked: boolean;
    author: ParticipantModel;
    reviewers: ParticipantModel[];
    participants: ParticipantModel[];
    private client;
    private parent;
    href: string;
    constructor(client: IClient, data?: any);
    set_parent(path: string): PullRequestModel;
    activities(): void;
    changes(opt?: RequestOptions): any;
    comments(): void;
    commits(opt?: CommitsOptions): any;
    diff(): void;
    buildStatus(): any;
}
