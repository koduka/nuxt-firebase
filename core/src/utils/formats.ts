
export function yen(value: string | number) {
    const formatter = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY'
    })

    return formatter.format(Number(value))
}

export function number(value: string | number) {
    const formatter = new Intl.NumberFormat()

    return formatter.format(Number(value))
}

export function percent(value: string | number, maximumSignificantDigits?: number) {
    const formatter = new Intl.NumberFormat('ja', {
        style: 'percent',
        maximumSignificantDigits: maximumSignificantDigits
    })

    return formatter.format(Number(value))
}

export function padStart(value: string | number, maxLength: number, fillString?: string) {
    return value.toString().padStart(maxLength, fillString)
}

export function padEnd(value: string | number, maxLength: number, fillString?: string) {
    return value.toString().padEnd(maxLength, fillString)
}