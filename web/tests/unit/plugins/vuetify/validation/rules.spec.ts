import { rules } from '@/plugins/vuetify/validation/rules'
import factory from '@tests/factory'
import Vue from 'vue'
import Vuetify from 'vuetify'
import FormTestComponent from './FormTestComponent.vue'

describe('モジュールのテスト', () => {
  it('rules.alpha', () => {
    expect(rules.alpha('A')).toBe(true)
    expect(rules.alpha('a')).toBe(true)
    expect(rules.alpha('')).toBe(true)
    expect(rules.alpha(undefined)).toBe(true)
    expect(rules.alpha(null)).toBe(true)
    expect(rules.alpha('1')).not.toBe(true)
    expect(rules.alpha('ａ')).not.toBe(true)
    expect(rules.alpha('あ')).not.toBe(true)
    expect(rules.alpha({})).not.toBe(true)
  })

  it('rules.alphaNum', () => {
    expect(rules.alphaNum('A')).toBe(true)
    expect(rules.alphaNum('a')).toBe(true)
    expect(rules.alphaNum('1')).toBe(true)
    expect(rules.alphaNum('')).toBe(true)
    expect(rules.alphaNum(undefined)).toBe(true)
    expect(rules.alphaNum(null)).toBe(true)
    expect(rules.alphaNum('ａ')).not.toBe(true)
    expect(rules.alphaNum('あ')).not.toBe(true)
    expect(rules.alphaNum({})).not.toBe(true)
  })

  it('rules.between', () => {
    const rule = rules.between({ min: 0, max: 10 })
    expect(rule(0)).toBe(true)
    expect(rule(10)).toBe(true)
    expect(rule('0')).toBe(true)
    expect(rule('')).toBe(true)
    expect(rule(undefined)).toBe(true)
    expect(rule(null)).toBe(true)
    expect(rule(-1)).not.toBe(true)
    expect(rule(11)).not.toBe(true)
    expect(rule(10.1)).not.toBe(true)
    expect(rule({})).not.toBe(true)
  })

  it('rules.decimal', () => {
    expect(rules.decimal(1)).toBe(true)
    expect(rules.decimal(1.1)).toBe(true)
    expect(rules.decimal(.1)).toBe(true)
    expect(rules.decimal(1.)).toBe(true)
    expect(rules.decimal(-1)).toBe(true)
    expect(rules.decimal(0b1)).toBe(true)
    expect(rules.decimal(0o17)).toBe(true)
    expect(rules.decimal(0xff)).toBe(true)
    expect(rules.decimal('1')).toBe(true)
    expect(rules.decimal('-1')).toBe(true)
    expect(rules.decimal('01')).toBe(true)
    expect(rules.decimal('')).toBe(true)
    expect(rules.decimal(undefined)).toBe(true)
    expect(rules.decimal(null)).toBe(true)
    expect(rules.decimal('.1')).not.toBe(true)
    expect(rules.decimal('1.')).not.toBe(true)
    expect(rules.decimal('.')).not.toBe(true)
    expect(rules.decimal('0b1')).not.toBe(true)
    expect(rules.decimal('0o17')).not.toBe(true)
    expect(rules.decimal('0xff')).not.toBe(true)
    expect(rules.decimal({})).not.toBe(true)
  })

  it('rules.email', () => {
    expect(rules.email('email@local.test.com')).toBe(true)
    expect(rules.email("^-_.=!#$%&'~|`{}?[]\@local.test.com")).toBe(true)
    expect(rules.email('')).toBe(true)
    expect(rules.email(undefined)).toBe(true)
    expect(rules.email(null)).toBe(true)
    expect(rules.email('._@local.test.com')).not.toBe(true)
    expect(rules.email('_.@local.test.com')).not.toBe(true)
    expect(rules.email('"@local.test.com')).not.toBe(true)
    expect(rules.email('<@local.test.com')).not.toBe(true)
    expect(rules.email('>@local.test.com')).not.toBe(true)
    expect(rules.email('(@local.test.com')).not.toBe(true)
    expect(rules.email(')@local.test.com')).not.toBe(true)
    expect(rules.email('@local.test.com')).not.toBe(true)
    expect(rules.email('@local.test.')).not.toBe(true)
    expect(rules.email('✋@local.test.')).not.toBe(true)
    expect(rules.email('email@local')).not.toBe(true)
    expect(rules.email({})).not.toBe(true)
  })

  it('rules.integer', () => {
    expect(rules.integer(1)).toBe(true)
    expect(rules.integer(-1)).toBe(true)
    expect(rules.integer('1')).toBe(true)
    expect(rules.integer('-1')).toBe(true)
    expect(rules.integer('')).toBe(true)
    expect(rules.integer(undefined)).toBe(true)
    expect(rules.integer(null)).toBe(true)
    expect(rules.integer(1.1)).not.toBe(true)
    expect(rules.integer(-1.1)).not.toBe(true)
    expect(rules.integer('1.1')).not.toBe(true)
    expect(rules.integer('-1.1')).not.toBe(true)
    expect(rules.integer('a')).not.toBe(true)
    expect(rules.integer({})).not.toBe(true)
  })

  it('rules.maxLength', () => {
    const rule = rules.maxLength(10)
    expect(rule('a'.repeat(10))).toBe(true)
    expect(rule(new Array(10))).toBe(true)
    expect(rule('')).toBe(true)
    expect(rule(undefined)).toBe(true)
    expect(rule(null)).toBe(true)
    expect(rule('a'.repeat(11))).not.toBe(true)
    expect(rule(new Array(11))).not.toBe(true)
    expect(rule(1)).not.toBe(true)
    expect(rule({})).not.toBe(true)
  })

  it('rules.maxValue', () => {
    const rule = rules.maxValue(10)
    expect(rule(10)).toBe(true)
    expect(rule('10')).toBe(true)
    expect(rule('')).toBe(true)
    expect(rule(undefined)).toBe(true)
    expect(rule(null)).toBe(true)
    expect(rule(11)).not.toBe(true)
    expect(rule('11')).not.toBe(true)
    expect(rule('a')).not.toBe(true)
    expect(rule({})).not.toBe(true)
  })

  it('rules.minLength', () => {
    const rule = rules.minLength(10)
    expect(rule('a'.repeat(10))).toBe(true)
    expect(rule(new Array(10))).toBe(true)
    expect(rule('')).toBe(true)
    expect(rule(undefined)).toBe(true)
    expect(rule(null)).toBe(true)
    expect(rule('a'.repeat(9))).not.toBe(true)
    expect(rule(new Array(9))).not.toBe(true)
    expect(rule(1)).not.toBe(true)
    expect(rule({})).not.toBe(true)
  })

  it('rules.minValue', () => {
    const rule = rules.minValue(10)
    expect(rule(10)).toBe(true)
    expect(rule('10')).toBe(true)
    expect(rule('')).toBe(true)
    expect(rule(undefined)).toBe(true)
    expect(rule(null)).toBe(true)
    expect(rule(9)).not.toBe(true)
    expect(rule('9')).not.toBe(true)
    expect(rule('a')).not.toBe(true)
    expect(rule({})).not.toBe(true)
  })

  it('rules.numeric', () => {
    expect(rules.numeric(1)).toBe(true)
    expect(rules.numeric(1.1)).toBe(true)
    expect(rules.numeric(.1)).toBe(true)
    expect(rules.numeric(1.)).toBe(true)
    expect(rules.numeric(0b1)).toBe(true)
    expect(rules.numeric(0o17)).toBe(true)
    expect(rules.numeric(0xff)).toBe(true)
    expect(rules.numeric('01')).toBe(true)
    expect(rules.numeric('.1')).toBe(true)
    expect(rules.numeric('')).toBe(true)
    expect(rules.numeric(undefined)).toBe(true)
    expect(rules.numeric(null)).toBe(true)
    expect(rules.numeric(-1)).not.toBe(true)
    expect(rules.numeric('-1')).not.toBe(true)
    expect(rules.numeric('1.')).not.toBe(true)
    expect(rules.numeric('.')).not.toBe(true)
    expect(rules.numeric('0b1')).not.toBe(true)
    expect(rules.numeric('0o17')).not.toBe(true)
    expect(rules.numeric('0xff')).not.toBe(true)
    expect(rules.numeric({})).not.toBe(true)
  })

  it('rules.required', () => {
    expect(rules.required(1)).toBe(true)
    expect(rules.required('a')).toBe(true)
    expect(rules.required({ a: 'a' })).toBe(true)
    expect(rules.required(['a'])).toBe(true)
    expect(rules.required(false)).toBe(true)
    expect(rules.required('')).not.toBe(true)
    expect(rules.required([])).not.toBe(true)
    expect(rules.required({})).not.toBe(true)
    expect(rules.required(undefined)).not.toBe(true)
    expect(rules.required(null)).not.toBe(true)
  })

  it('rules.equals', () => {
    let rule = rules.equals({ otherName: 'bool', otherValue: true })
    expect(rule(true)).toBe(true)
    expect(rule(false)).not.toBe(true)

    rule = rules.equals({ otherName: 'string', otherValue: 'a' })
    expect(rule('a')).toBe(true)
    expect(rule('b')).not.toBe(true)

    rule = rules.equals({ otherName: 'number', otherValue: 1 })
    expect(rule(1)).toBe(true)
    expect(rule(1.0)).toBe(true)
    expect(rule('1')).not.toBe(true)

    rule = rules.equals({ otherName: 'object', otherValue: { value1: 'a', value2: 1, value3: { b: 'b', c: 'c' }, value4: [0, 'd'] } })
    expect(rule({ value1: 'a', value2: 1, value3: { b: 'b', c: 'c' }, value4: [0, 'd'] })).toBe(true)
    expect(rule({ value1: 'a', value2: 1, value3: { c: 'c', b: 'b' }, value4: [0, 'd'] })).toBe(true)
    expect(rule({ value1: 'a', value2: '1', value3: { b: 'b', c: 'c' }, value4: [0, 'd'] })).not.toBe(true)
    expect(rule({ value1: 'a', value2: 1, value3: { c: 'c', b: 'b' }, value4: ['d', 0] })).not.toBe(true)
    expect(rule({ value1: 'a' })).not.toBe(true)
    expect(rule({})).not.toBe(true)
    expect(rule('a')).not.toBe(true)

    rule = rules.equals({ otherName: 'array', otherValue: ['a', 9] })
    expect(rule(['a', 9])).toBe(true)
    expect(rule([9, 'a'])).not.toBe(true)
    expect(rule(['a'])).not.toBe(true)
    expect(rule([])).not.toBe(true)
    expect(rule('a')).not.toBe(true)
  })

  it('rules.url', () => {
    expect(rules.url('http://jp.co.example/local/test')).toBe(true)
    expect(rules.url('https://jp.co.example/local/test')).toBe(true)
    expect(rules.url('ftp://jp.co.example/local/test')).toBe(true)
    expect(rules.url('')).toBe(true)
    expect(rules.url(undefined)).toBe(true)
    expect(rules.url(null)).toBe(true)
    expect(rules.url('localhost')).not.toBe(true)
    expect(rules.url({})).not.toBe(true)
  })
})

Vue.use(Vuetify)

describe('コンポーネントからの呼び出しテスト', () => {

  // const factory = (component: VueConstructor<Vue>, options?: ThisTypedMountOptions<Vue>) => {
  //     const localVue = createLocalVue()
  //     localVue.prototype.$rules = rules
  //     return mount(component, {
  //         localVue,
  //         vuetify,
  //         ...options
  //     })
  // }

  it('form success', async () => {
    const form = factory(FormTestComponent)
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(true)
  })

  it('form error alpha', async () => {
    const form = factory(FormTestComponent, { data() { return { alpha: 1 } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error alphaNum', async () => {
    const form = factory(FormTestComponent, { data() { return { alphaNum: '-' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error between', async () => {
    const form = factory(FormTestComponent, { data() { return { between: '-' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error decimal', async () => {
    const form = factory(FormTestComponent, { data() { return { decimal: '-' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error email', async () => {
    const form = factory(FormTestComponent, { data() { return { email: '-' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error integer', async () => {
    const form = factory(FormTestComponent, { data() { return { integer: '-' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error maxLength', async () => {
    const form = factory(FormTestComponent, { data() { return { maxLength: 'a'.repeat(11) } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error maxValue', async () => {
    const form = factory(FormTestComponent, { data() { return { maxValue: '11' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error minLength', async () => {
    const form = factory(FormTestComponent, { data() { return { minLength: 'a'.repeat(9) } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error minValue', async () => {
    const form = factory(FormTestComponent, { data() { return { minValue: '9' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error numeric', async () => {
    const form = factory(FormTestComponent, { data() { return { numeric: '-' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error required', async () => {
    const form = factory(FormTestComponent, { data() { return { required: '' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error equals', async () => {
    const form = factory(FormTestComponent, { data() { return { equalsOther: 'a', equals: 'b' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })

  it('form error url', async () => {
    const form = factory(FormTestComponent, { data() { return { url: 'a' } } })
    const button = form.findComponent({ ref: 'validate-btn' })
    await button.trigger('click')
    expect(form.vm.$data.valid).toBe(false)
  })
})
