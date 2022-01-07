import { DefaultEntityData, Entity } from "./entity";

export const USER_PATH = 'users'

type EntityData = DefaultEntityData & {
  name: string,
  email: string,
}

export class User implements Entity {
  id?: string
  readonly path: string = USER_PATH
  readonly data: EntityData

  constructor(data: EntityData) {
    this.data = data
  }
}
