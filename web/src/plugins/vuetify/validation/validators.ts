import _ from 'lodash'

const isEmpty = (value: any) => value === undefined || value === null || value === ''

export default {
    alpha: (value: any) => isEmpty(value) || /^[a-zA-Z]*$/.test(value),
    alphaNum: (value: any) => isEmpty(value) || /^[a-zA-Z0-9]*$/.test(value),
    // and: (...validators: any[]) => { },
    between: (value: any, min: number, max: number) => isEmpty(value) || min <= value && max >= value,
    decimal: (value: any) => isEmpty(value) || /^[-]?\d+(\.\d+)?$/.test(value),
    email: (value: any) => isEmpty(value) || /^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i.test(value),
    integer: (value: any) => isEmpty(value) || /(^[0-9]*$)|(^-[0-9]+$)/.test(value),
    // ipAddress: (value: any) => { },
    // macAddress: (value: any) => { },
    maxLength: (value: any, max: number) => isEmpty(value) || max >= value.length,
    maxValue: (value: any, max: number) => isEmpty(value) || max >= value,
    minLength: (value: string, min: number) => isEmpty(value) || min <= value.length,
    minValue: (value: any, min: number) => isEmpty(value) || min <= value,
    // not: (value: string) => { },
    numeric: (value: any) => isEmpty(value) || /^\d*(\.\d+)?$/.test(value),
    // or: (value: any) => { },
    required: (value: any) => {
        if (Array.isArray(value)) return !!value.length

        if (isEmpty(value)) {
            return false
        }

        if (value === false) {
            return true
        }

        if (value instanceof Date) {
            return !isNaN(value.getTime())
        }

        if (typeof value === 'object') {
            for (let _ in value) return true

            return false
        }

        return !!String(value).length
    },
    // requiredIf: (value: any) => { }
    // requiredUnless: (value: any) => { }
    equals: (value: any, other: any) => {
        return _.isEqual(value, other)
    },
    // https://gist.github.com/dperini/729294#file-regex-weburl-js-L62
    url: (value: any) => isEmpty(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value),
}