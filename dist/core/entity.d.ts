import { Relation, LinkDictionary, Entity } from './interfaces';
export default class EntityModel implements Entity {
    link: Relation;
    links: LinkDictionary;
    constructor(data?: any);
}
