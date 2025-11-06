export default class {
    static toISOString(date: string | Date | undefined) {
        if(typeof date === "string") {
            const ms = Date.parse(date)
            return isNaN(ms) ? undefined : (new Date(ms)).toISOString()
        } else if(date instanceof Date) {
            return date.toISOString()
        }
        return undefined
    }
}