export function yen(value) {
    const formatter = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY'
    });
    return formatter.format(Number(value));
}
export function number(value) {
    const formatter = new Intl.NumberFormat();
    return formatter.format(Number(value));
}
export function percent(value, maximumSignificantDigits) {
    const formatter = new Intl.NumberFormat('ja', {
        style: 'percent',
        maximumSignificantDigits: maximumSignificantDigits
    });
    return formatter.format(Number(value));
}
export function padStart(value, maxLength, fillString) {
    return value.toString().padStart(maxLength, fillString);
}
export function padEnd(value, maxLength, fillString) {
    return value.toString().padEnd(maxLength, fillString);
}
