export declare type Entity = {
    id?: string;
    readonly path: string;
    readonly data: SoftDeleteableEntityData | DefaultEntityData;
};
export declare type DefaultEntityData = {
    createdAt?: Date;
    createdBy?: string;
    updatedAt?: Date;
    updatedBy?: string;
};
export declare type SoftDeleteableEntityData = DefaultEntityData & {
    daletedAt?: Date;
    daletedBy?: string;
};
