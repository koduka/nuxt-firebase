import { DefaultEntityData, Entity } from "./entity";
export declare const CONTACT_PATH = "contacts";
declare type EntityData = DefaultEntityData & {
    email: string;
    title: string;
    contract: string;
};
export declare class Contact implements Entity {
    readonly id?: string;
    readonly path: string;
    readonly data: EntityData;
    constructor(data: EntityData, id?: string);
}
export {};
