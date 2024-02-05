export const isEmptyString = (string: string) => {
    if (!string || string.trim() == "" || string == null || string == undefined) {
        return true
    } else {
        return false
    }
}