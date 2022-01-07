import firebase from "@/plugins/firebase"
import validation from "@/plugins/vuetify"
import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import { NuxtRuntimeConfig } from "@nuxt/types/config/runtime"
import { createLocalVue, mount, ThisTypedMountOptions } from "@vue/test-utils"
import Vue, { VueConstructor } from "vue"
import Vuetify from "vuetify"
import nuxtConfig from "../nuxt.config"

const vuetify = new Vuetify()

function loadPlugins(context: Context, inject: Inject) {
  validation(context, inject)
  firebase(context, inject)
}

export const mockContext = {
  $config: nuxtConfig.publicRuntimeConfig as NuxtRuntimeConfig,
  isDev: true
} as Context

function makeLocalVue() {
  const localVue = createLocalVue()
  const context = mockContext
  const inject: Inject = (key: string, value: any) => {
    localVue.prototype['$' + key] = value
  }
  loadPlugins(context, inject)

  return localVue
}

export function createFactory() {
  const localVue = makeLocalVue()
  return (component: VueConstructor<Vue>, options?: ThisTypedMountOptions<Vue>) => {
    return mount(component, {
      localVue,
      vuetify,
      ...options
    })
  }
}

export default createFactory()
