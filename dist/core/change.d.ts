import { Change, Path } from './interfaces';
import EntityModel from './entity';
export default class ChangeModel extends EntityModel implements Change {
    contentId: string;
    fromContentId: string;
    path: Path;
    executable: boolean;
    percentUnchanged: number;
    type: string;
    nodeType: string;
    srcPath: Path;
    srcExecutable: boolean;
    constructor(data?: any);
}
