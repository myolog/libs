export default class MyoDate extends Date {
    constructor() {
        super()
    }
    static toISOString(date: string | Date | undefined) {
        if(typeof date === "string") {
            const ms = Date.parse(date)
            return isNaN(ms) ? undefined : (new Date(ms)).toLocaleDateString()
        } else if(date instanceof Date) {
            return date.toLocaleDateString()
        }
        return undefined
    }
}