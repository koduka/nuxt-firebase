import { StorageClient } from '@/plugins/firebase/clients/storage'
import { mockContext } from '@tests/factory'
import { initializeApp } from 'firebase/app'

describe('ユニットテスト', () => {

  const app = initializeApp({
    apiKey: mockContext.$config.firebaseApiKey,
    authDomain: mockContext.$config.firebaseAuthDomain,
    databaseURL: mockContext.$config.firebaseDatabaseURL,
    projectId: mockContext.$config.firebaseProjectId,
    storageBucket: mockContext.$config.firebaseStorageBucket,
    messagingSenderId: mockContext.$config.firebaseMessagingSenderId,
    appId: mockContext.$config.firebaseAppId,
    measurementId: mockContext.$config.firebaseMeasurementId
  })

  const storage = new StorageClient(app, mockContext)

  it('storage.backet.upload', async () => {
    const bucket = storage.getBucket()
    const uploadFile = new File(new Array<Blob>(), 'file.txt')

    const result = await bucket.upload(uploadFile, '/upload/file.txt')

    expect(result).not.toBeNull()
    expect(result).not.toBe(undefined)
    expect(result.metadata.fullPath).toBe(`${bucket.name}/upload/file.txt`)
    expect(result.metadata.size).toBe(uploadFile.size)
  })

  it('storage.backet.uploadResumable', async () => {
    const bucket = storage.getBucket()
    const uploadFile = new File(new Array<Blob>(), 'file.txt')

    const task = await bucket.uploadResumable(uploadFile, '/uploadResumable/file.txt')
    expect(task).not.toBeNull()
  })

  it('storage.backet.delete', async () => {
    const bucket = storage.getBucket()
    const uploadFile = new File(new Array<Blob>(), 'file.txt')
    await bucket.upload(uploadFile, '/delete/file.txt')

    const result = await bucket.delete('/delete/file.txt')
    expect(result).not.toBeNull()
  })

  it('storage.backet.getDownloadURL', async () => {
    const bucket = storage.getBucket()
    const uploadFile = new File(new Array<Blob>(), 'file.txt')
    await bucket.upload(uploadFile, '/downloadURL/file.txt')

    const url = await bucket.getDownloadURL('/downloadURL/file.txt')

    expect(url).toBe('')
  })

  it('storage.backet.getList', async () => {
    const bucket = storage.getBucket()
    const uploadFile = new File(new Array<Blob>(), 'file.txt')
    for (let i = 0; i < 11; i++) {
      await bucket.upload(uploadFile, `/list/file_${i.toString()}.txt`)
    }

    const result = await bucket.getList('/list')

    expect(result.items.length).toBe(10)
  })

  it('storage.backet.getListAll', async () => {
    const bucket = storage.getBucket()
    const uploadFile = new File(new Array<Blob>(), 'file.txt')
    for (let i = 0; i < 11; i++) {
      await bucket.upload(uploadFile, `/listAll/file_${i.toString()}.txt`)
    }

    const result = await bucket.getListAll('/listAll')

    expect(result.items.length).toBe(11)
  })
})
