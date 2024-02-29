export default function isJson(i: string): boolean {
    try {
        JSON.parse(i)
    } catch (error) {
        return false;
    }
    return true;
}