import { DefaultEntityData, Entity } from "./entity";
export declare const USER_PATH = "users";
declare type EntityData = DefaultEntityData & {
    name: string;
    email: string;
};
export declare class User implements Entity {
    id?: string;
    readonly path: string;
    readonly data: EntityData;
    constructor(data: EntityData);
}
export {};
