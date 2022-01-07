import { InputValidationRule } from 'vuetify'
import * as messages from './messages'
import * as validators from './validators'

export type ExtendedInputValidationRule<T> = (params: T) => InputValidationRule

export type Rules = {
    readonly alpha: InputValidationRule
    readonly alphaNum: InputValidationRule
    readonly between: ExtendedInputValidationRule<{ min: number, max: number }>
    readonly decimal: InputValidationRule
    readonly email: InputValidationRule
    readonly integer: InputValidationRule
    readonly maxLength: ExtendedInputValidationRule<number>
    readonly maxValue: ExtendedInputValidationRule<number>
    readonly minLength: ExtendedInputValidationRule<number>
    readonly minValue: ExtendedInputValidationRule<number>
    readonly numeric: InputValidationRule
    readonly required: InputValidationRule
    readonly equals: ExtendedInputValidationRule<{ otherName: string, otherValue: any }>
    readonly url: InputValidationRule
}

export const rules = {
    alpha: (value: any) => validators.default.alpha(value) || messages.default.alpha,
    alphaNum: (value: any) => validators.default.alphaNum(value) || messages.default.alphaNum,
    between: ({ min, max }) => (value: any) => validators.default.between(value, min, max) || messages.default.between(min, max),
    decimal: (value: any) => validators.default.decimal(value) || messages.default.decimal,
    email: (value: any) => validators.default.email(value) || messages.default.email,
    integer: (value: any) => validators.default.integer(value) || messages.default.integer,
    maxLength: (max) => (value: any) => validators.default.maxLength(value, max) || messages.default.maxLength(max),
    maxValue: (max) => (value: any) => validators.default.maxValue(value, max) || messages.default.maxValue(max),
    minLength: (min) => (value: any) => validators.default.minLength(value, min) || messages.default.minLength(min),
    minValue: (min) => (value: any) => validators.default.minValue(value, min) || messages.default.minValue(min),
    numeric: (value: any) => validators.default.numeric(value) || messages.default.numeric,
    required: (value: any) => validators.default.required(value) || messages.default.required,
    equals: ({ otherName, otherValue }) => (value: any) => validators.default.equals(value, otherValue) || messages.default.equals((otherName)),
    url: (value: any) => validators.default.url(value) || messages.default.url,
} as Rules