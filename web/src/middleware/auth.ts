import { Context } from "@nuxt/types";

export default async ({ app, redirect }: Context) => {
  app.$auth.onStateChanged(async (user) => {
    if (!user) {
      await app.$auth.singOut()
      redirect('/signin')
    }
  })
}
