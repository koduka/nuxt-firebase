import { Entity } from '@app/core';
import { Context } from "@nuxt/types";
import { FirebaseApp } from "firebase/app";
import { Auth, getAuth } from 'firebase/auth';
import { addDoc, collection, connectFirestoreEmulator, deleteDoc, doc, endBefore, FieldPath, Firestore, getDoc, getDocs, getFirestore, limitToLast, orderBy, OrderByDirection, query, serverTimestamp, startAfter, updateDoc, where, WhereFilterOp } from "firebase/firestore";

export type Condition = { fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown }

export class FirestoreClient {

  private firestore: Firestore
  private auth: Auth

  constructor(app: FirebaseApp, context: Context) {
    this.firestore = getFirestore(app)
    this.auth = getAuth(app)
    if (context.isDev) {
      const emulatorHost = context.$config.firebaseEmulatorHost || 'localhost'
      const emulatorPort = parseInt(context.$config.firebaseEmulatorFirestorePort || '8080')
      connectFirestoreEmulator(this.firestore, emulatorHost, emulatorPort)
    }
  }

  findById<T extends Entity>(path: string, id: string): Promise<T> {
    console.log('called: findById')
    console.log(`id: ${id}`)

    return getDoc(doc(this.firestore, path, id))
      .then(snapshot => {
        console.log('snapshot: ' + JSON.stringify(snapshot.data()))
        return {
          id: snapshot.id,
          data: snapshot.data()
        } as T
      })
  }

  findAll<T extends Entity>(path: string, conditions: Condition[]): Promise<T[]> {
    console.log('called: find')
    console.log(`condition: ${conditions}`)

    const wheres = conditions.map(condition => where(condition.fieldPath, condition.opStr, condition.value))

    return getDocs(query(collection(this.firestore, path), ...wheres))
      .then(snapshot => snapshot.docs.map(doc => {
        return {
          id: doc.id,
          data: doc.data()
        } as T
      }))
  }

  search<T extends Entity>(path: string, conditions: Condition[], limit = 10, order: { field: string, directionStr?: OrderByDirection } = { field: 'createdAt' }): Promise<Page<T>> {
    console.log('called: search')
    console.log(`condition: ${conditions}`)

    const wheres = conditions.map(condition => where(condition.fieldPath, condition.opStr, condition.value))
    const constraint = [...wheres, orderBy(order.field, order.directionStr), limitToLast(limit)]

    return getDocs(query(collection(this.firestore, path), ...constraint))
      .then(snapshot => {
        const preSearch: Search = <T extends Entity>(entity: T) => {
          const field = Object.entries(entity)
            .map(([name, value]) => {
              return {
                name: name,
                value: value
              }
            })
            .filter(field => order.field === field.name)
            .pop()

          return getDocs(query(collection(this.firestore, entity.path), ...[...constraint, endBefore(field?.value)]))
            .then(snapshot => snapshot.docs.map(doc => {
              return {
                id: doc.id,
                data: doc.data()
              } as T
            }))
        }

        const nextSearch: Search = <T extends Entity>(entity: T) => {
          const field = Object.entries(entity)
            .map(([name, value]) => {
              return {
                name: name,
                value: value
              }
            })
            .filter(field => order.field === field.name)
            .pop()

          return getDocs(query(collection(this.firestore, entity.path), ...[...constraint, startAfter(field?.value)]))
            .then(snapshot => snapshot.docs.map(doc => {
              return {
                id: doc.id,
                data: doc.data()
              } as T
            }))
        }
        const data = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            data: doc.data()
          } as T
        })

        return new Page(1, limit, Number(snapshot.size / limit), snapshot.size, data, nextSearch, preSearch)
      })
  }

  async create<T extends Entity>(entity: T) {
    console.log('called: create')
    console.log(`entity: ${JSON.stringify(entity)}`)

    const data = {
      ...entity.data,
      createdAt: serverTimestamp(),
      createdBy: this.auth.currentUser?.uid,
      updatedAt: serverTimestamp(),
      updatedBy: this.auth.currentUser?.uid
    }

    return addDoc(collection(this.firestore, entity.path), data)
      .then(async ref => {
        return {
          id: ref.id,
          data: (await getDoc(ref)).data()
        } as T
      })
  }

  update<T extends Entity>(entity: T) {
    const docRef = doc(this.firestore, `${entity.path}/${entity.id}`)
    const data = {
      ...entity.data,
      updatedAt: serverTimestamp(),
      updatedBy: this.auth.currentUser?.uid
    }

    return updateDoc(docRef, data)
      .then(async () => {
        return {
          id: docRef.id,
          data: (await getDoc(docRef)).data()
        } as T
      })
  }

  delete<T extends Entity>(entity: T) {
    if ('deletedAt' in entity.data || 'deletedBy' in entity.data) {
      const data = Object.assign(entity.data)
      const copy = {
        id: entity.id,
        data: {
          ...data,
          daletedAt: serverTimestamp(),
          daletedBy: this.auth.currentUser?.uid
        }
      } as T
      return this.update(copy).then(() => true)
    } else {
      return deleteDoc(doc(this.firestore, `${entity.path}/${entity.id}`)).then(() => true)
    }
  }
}

type Search = <T extends Entity>(entity: T) => Promise<T[]>

export class Page<T extends Entity> {

  readonly current: number;
  readonly limit: number;
  readonly size: number;
  readonly total: number;
  readonly data: T[];
  readonly next: Search;
  readonly pre: Search;

  constructor(current: number, limit: number, size: number, total: number, data: T[], next: Search, pre: Search) {
    this.current = current
    this.limit = limit
    this.size = size
    this.total = total
    this.data = data
    this.next = next
    this.pre = pre
  }

  async nextPage() {
    const data = await this.next(this.data[this.data.length - 1])
    return new Page(this.current + 1, this.limit, this.size, this.total, data, this.next, this.pre)
  }

  async prePage() {
    const data = await this.pre(this.data[0])
    return new Page(this.current - 1, this.limit, this.size, this.total, data, this.next, this.pre)
  }
}
