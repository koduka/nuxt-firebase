import { Context } from "@nuxt/types";
import { FirebaseApp } from "firebase/app";
import { connectStorageEmulator, deleteObject, FirebaseStorage, getDownloadURL, getStorage, list, listAll, ref, StorageReference, uploadBytes, uploadBytesResumable } from "firebase/storage";

export class StorageClient {

  private app: FirebaseApp
  private context: Context
  private buckets: { [name: string]: Bucket } = {}
  private defautBucketName: string

  constructor(app: FirebaseApp, context: Context) {
    this.app = app
    this.context = context

    const defaultBucket = new Bucket(app, context)
    this.defautBucketName = defaultBucket.name
    this.buckets[this.defautBucketName] = defaultBucket
  }

  getBucket(bucketName: string = this.defautBucketName) {
    this.buckets[bucketName] = this.buckets[bucketName] || new Bucket(this.app, this.context, bucketName)
    return this.buckets[bucketName]
  }
}

export class Bucket {

  private storage: FirebaseStorage
  private reference: StorageReference

  get name() {
    return this.reference.bucket
  }

  constructor(app: FirebaseApp, context: Context, name?: string) {
    if (name) {
      this.storage = getStorage(app, `gs://${name}`)
    } else {
      this.storage = getStorage(app)
    }
    this.reference = ref(this.storage)

    if (context.isDev) {
      const emulatorHost = context.$config.firebaseEmulatorHost || 'localhost'
      const emulatorPort = parseInt(context.$config.firebaseEmulatorStoragePort || '9199')
      connectStorageEmulator(this.storage, emulatorHost, emulatorPort)
    }
  }

  upload(file: File, path?: string) {
    return uploadBytes(ref(this.reference, path), file)
  }

  uploadResumable(file: File, path?: string) {
    return uploadBytesResumable(ref(this.reference, path), file)
  }

  delete(path?: string) {
    return deleteObject(ref(this.reference, path))
  }

  getDownloadURL(path?: string) {
    return getDownloadURL(ref(this.reference, path))
  }

  getList(path?: string, pageToken?: string, max: number = 10) {
    return list(ref(this.reference, path), {
      maxResults: max,
      pageToken: pageToken
    })
  }

  getListAll(path?: string) {
    return listAll(ref(this.reference, path))
  }
}
