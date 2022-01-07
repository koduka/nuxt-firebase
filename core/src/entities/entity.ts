export type Entity = {
  id?: string
  readonly path: string
  readonly data: SoftDeleteableEntityData | DefaultEntityData
}

export type DefaultEntityData = {
  createdAt?: Date,
  createdBy?: string,
  updatedAt?: Date,
  updatedBy?: string,
}

export type SoftDeleteableEntityData = DefaultEntityData & {
  daletedAt?: Date,
  daletedBy?: string
}
