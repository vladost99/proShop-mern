export function clearAnyTimeout(ms, cb) {
    setTimeout(() => cb(), ms);
}