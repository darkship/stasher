import { Fork } from './interfaces';
import { IClient } from '../client-base';
import RepositoryModel from './repository';
export default class ForkModel extends RepositoryModel implements Fork {
    origin: RepositoryModel;
    constructor(client: IClient, data?: any);
}
