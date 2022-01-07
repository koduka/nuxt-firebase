
export default {
    alpha: 'The value is not alphabetical',
    alphaNum: 'The value must be alpha-numeric',
    // and: "",
    between: (min: number, max: number) => `The value must be between ${min} and ${max}`,
    decimal: 'Value must be decimal',
    email: 'Value is not a valid email address',
    integer: 'Value is not an integer',
    // ipAddress: "",
    // macAddress: "",
    maxLength: (max: number) => `The maximum length allowed is ${max}`,
    maxValue: (max: number) => `The maximum value is ${max}`,
    minLength: (min: number) => `This field should be at least ${min} long`,
    minValue: (min: number) => `The minimum value allowed is ${min}`,
    // not: "",
    numeric: 'Value must be numeric',
    // or: "",
    required: 'Value is required',
    // requiredIf: "",
    // requiredUnless: "",
    equals: (otherName: string) => `The value must be equal to the ${otherName} value`,
    url: 'The value is not a valid URL address'
}