import { Context } from "@nuxt/types"
import { Inject } from "@nuxt/types/app"
import { Rules, rules } from './validation/rules'

export default (context: Context, inject: Inject) => {
    inject('rules', rules)
}

declare module 'vue/types/vue' {
    interface Vue {
        readonly $rules: Rules
    }
}