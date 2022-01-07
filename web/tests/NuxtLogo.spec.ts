import NuxtLogo from '@/components/NuxtLogo.vue'
import { mount } from '@vue/test-utils'

describe('NuxtLogo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(NuxtLogo)
    expect(wrapper.vm).toBeTruthy()
  })
})
