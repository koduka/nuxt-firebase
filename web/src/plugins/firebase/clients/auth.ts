import { Context } from "@nuxt/types";
import { FirebaseApp } from "firebase/app";
import { Auth, AuthCredential, checkActionCode, CompleteFn, connectAuthEmulator, createUserWithEmailAndPassword, ErrorFn, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, PhoneAuthProvider, signInWithCredential, signInWithEmailAndPassword, signInWithPopup, TwitterAuthProvider, User } from 'firebase/auth';

const AUTH_PROVIDER_ID = {
  GOOGLE: GoogleAuthProvider.PROVIDER_ID,
  TWITTER: TwitterAuthProvider.PROVIDER_ID,
  FACEBOOK: FacebookAuthProvider.PROVIDER_ID,
  PHONE: PhoneAuthProvider.PROVIDER_ID,
  GITHUB: GithubAuthProvider.PROVIDER_ID
}

type AuthProviderId = typeof AUTH_PROVIDER_ID.GOOGLE | typeof AUTH_PROVIDER_ID.TWITTER | typeof AUTH_PROVIDER_ID.FACEBOOK | typeof AUTH_PROVIDER_ID.PHONE | typeof AUTH_PROVIDER_ID.GITHUB

export class AuthClient {

  private auth: Auth

  get PROVIDER_ID() {
    return AUTH_PROVIDER_ID
  }

  constructor(app: FirebaseApp, context: Context) {
    this.auth = getAuth(app)
    if (context.isDev) {
      const emulatorHost = context.$config.firebaseEmulatorHost || 'localhost'
      const emulatorPort = context.$config.firebaseEmulatorAuthPort || '9099'
      connectAuthEmulator(this.auth, `http://${emulatorHost}:${emulatorPort}/`, { disableWarnings: true })
    }
  }

  refreshToken() {
    return this.auth.currentUser?.getIdTokenResult(true)
  }

  checkActionCode(code: string) {
    return checkActionCode(this.auth, code)
  }

  signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  signInWithPopup(providerId: AuthProviderId) {
    switch (providerId) {
      case AUTH_PROVIDER_ID.GOOGLE:
        const google = new GoogleAuthProvider()
        return signInWithPopup(this.auth, google)
      case AUTH_PROVIDER_ID.TWITTER:
        const twitter = new TwitterAuthProvider()
        return signInWithPopup(this.auth, twitter)
      case AUTH_PROVIDER_ID.FACEBOOK:
        const facebook = new FacebookAuthProvider()
        return signInWithPopup(this.auth, facebook)
      case AUTH_PROVIDER_ID.PHONE:
        const phone = new PhoneAuthProvider(this.auth)
        return signInWithPopup(this.auth, phone)
      case AUTH_PROVIDER_ID.GITHUB:
        const github = new GithubAuthProvider()
        return signInWithPopup(this.auth, github)
    }
  }

  signInWithCredential(credential: AuthCredential) {
    return signInWithCredential(this.auth, credential)
  }

  singOut() {
    return this.auth.signOut()
  }

  onStateChanged(changed: (user: User | null) => void, error?: ErrorFn, completed?: CompleteFn) {
    return onAuthStateChanged(this.auth, (user) => changed(user), error, completed)
  }
}
