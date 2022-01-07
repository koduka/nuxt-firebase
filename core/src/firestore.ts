import { DefaultEntityData, Entity, SoftDeleteableEntityData } from "./entities/entity";

type Condition = SoftDeleteableEntityData | DefaultEntityData

export interface FirestoreClient {
  findById<T extends Entity>(id: string): T
  find<T extends Entity>(condition: Condition): T
  findAll<T extends Entity>(condition: Condition): T
  search<T extends Entity>(condition: Condition, limit: number): T[]
  create<T extends Entity>(entity: T): T
}
