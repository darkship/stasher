import { Participant } from './interfaces';
import UserModel from './user';
export default class ParticipantModel implements Participant {
    user: UserModel;
    role: string;
    approved: boolean;
    constructor(data?: any);
}
