import { Repository } from './interfaces';
import { IClient, RequestOptions } from '../client-base';
import EntityModel from './entity';
import ProjectModel from './project';
export interface ChangesOptions extends RequestOptions {
    since?: string;
    until: string;
}
export interface CommitOptions extends RequestOptions {
    path?: string;
}
export interface CommitListOptions extends RequestOptions {
    path?: string;
    /** Commit ID or ref to include commits after (exclusive). */
    since?: string;
    /** Commit ID or ref to include commits before (inclusive). */
    until?: string;
    /** Include total # of commits and authors in response. */
    withCounts?: boolean;
}
export interface BranchOptions extends RequestOptions {
    /** Base branch or tag. */
    base?: string;
    /** Include branch metadata or not. */
    details?: boolean;
    /** String to match branch names on. */
    filterText?: string;
    /** Ordering by "ALPHABETICAL" (on branch name) or "MODIFICATION"
     * (last updated time). */
    orderBy?: string;
}
export interface PullRequestOptions extends RequestOptions {
    /** One of "ALL", "OPEN", "DECLINED", or "MERGED". Defaults to "OPEN". */
    state?: string;
    /** One of "INCOMING" or "OUTGOING". Defaults to "INCOMING". */
    direction?: string;
    /** A branch ID to find pull requests to or from. */
    at?: string;
    /** One of "OLDEST" or "NEWEST". */
    order?: string;
    /** Defaults to true. */
    withAttributes: boolean;
    /** Defaults to true. */
    withProperties: boolean;
}
export interface BrowseOptions extends RequestOptions {
    /** Relative path within the repository to retrieve content for. */
    path?: string;
    /** Changeset ID or ref to retrieve */
    at?: string;
    /** If true, return type only instead of content. Defaults to false. */
    type?: boolean;
    blame?: string;
    noContent?: string;
}
export interface TagOptions extends RequestOptions {
    filterText?: string;
    /** One of 'ALPHABETICAL' or 'MODIFICATION' */
    orderBy?: string;
}
export default class RepositoryModel extends EntityModel implements Repository {
    id: number;
    slug: string;
    name: string;
    scmId: string;
    state: string;
    statusMessage: string;
    forkable: boolean;
    project: ProjectModel;
    public: boolean;
    cloneUrl: string;
    href: string;
    private client;
    constructor(client: IClient, data?: any);
    related(opt?: RequestOptions): any;
    branches(opt?: BranchOptions): any;
    default_branch(): any;
    changes(opt?: ChangesOptions): any;
    commits(opt?: CommitListOptions): any;
    commit(id: string, opt?: CommitOptions): any;
    files(opt?: RequestOptions): any;
    browse(opt?: BrowseOptions): any;
    pull_requests(opt?: PullRequestOptions): any;
    pull_request(id: string): any;
    tags(opt?: TagOptions): any;
}
