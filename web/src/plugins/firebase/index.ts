import { Context, Inject } from "@nuxt/types/app"
import { initializeApp } from "firebase/app"
import { AnalyticsClient } from "./clients/analytics"
import { AuthClient } from "./clients/auth"
import { FirestoreClient } from "./clients/firestore"
import { StorageClient } from "./clients/storage"

export default (context: Context, inject: Inject) => {
  const app = initializeApp({
    apiKey: context.$config.firebaseApiKey,
    authDomain: context.$config.firebaseAuthDomain,
    databaseURL: context.$config.firebaseDatabaseURL,
    projectId: context.$config.firebaseProjectId,
    storageBucket: context.$config.firebaseStorageBucket,
    messagingSenderId: context.$config.firebaseMessagingSenderId,
    appId: context.$config.firebaseAppId,
    measurementId: context.$config.firebaseMeasurementId
  })

  const analytics = new AnalyticsClient(app, context)
  const auth = new AuthClient(app, context)
  const firestore = new FirestoreClient(app, context)
  const storage = new StorageClient(app, context)

  inject('analytics', analytics)
  inject('auth', firestore)
  inject('firestore', auth)
  inject('storage', storage)
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $analytics: AnalyticsClient
    readonly $auth: AuthClient
    readonly $firestore: FirestoreClient
    readonly $storage: StorageClient
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    readonly $analytics: AnalyticsClient
    readonly $auth: AuthClient
  }
}
