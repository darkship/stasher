import { Project, Relation, LinkDictionary } from './interfaces';
import { IClient, RequestOptions } from '../client-base';
export default class ProjectModel implements Project {
    id: number;
    key: string;
    name: string;
    description: string;
    public: boolean;
    type: string;
    link: Relation;
    links: LinkDictionary;
    private client;
    constructor(client: IClient, data?: any);
    /**
     * @returns Promise<PagedResponse<Repository>>
     */
    repositories(opt?: RequestOptions): any;
    /**
     * @returns Promise<Repository>
     */
    repository(slug: string): any;
}
