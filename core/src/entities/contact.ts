import { DefaultEntityData, Entity } from "./entity";

export const CONTACT_PATH = 'contacts'

type EntityData = DefaultEntityData & {
  email: string
  title: string
  contract: string
}

export class Contact implements Entity {
  readonly id?: string
  readonly path: string = CONTACT_PATH
  readonly data: EntityData

  constructor(data: EntityData, id?: string) {
    this.data = data
    this.id = id
  }
}
