import { Context } from "@nuxt/types";
import { Analytics, AnalyticsCallOptions, CustomEventName, EventParams, getAnalytics, logEvent } from "firebase/analytics";
import { FirebaseApp } from "firebase/app";

export class AnalyticsClient {

  private analytics: Analytics

  constructor(app: FirebaseApp, context: Context) {
    this.analytics = getAnalytics(app)
    if (context.isDev) {
    }
  }

  logEvent<T extends string>(eventName: CustomEventName<T>, eventParams?: EventParams, options?: AnalyticsCallOptions) {
    logEvent(this.analytics, eventName, eventParams, options)
  }
}
