import { BuildStatus } from './interfaces';
import { IClient } from '../client-base';
export default class BuildStatusModel implements BuildStatus {
    state: string;
    key: string;
    name: string;
    url: string;
    description: string;
    dateAdded: number;
    private client;
    constructor(client: IClient, data?: any);
}
