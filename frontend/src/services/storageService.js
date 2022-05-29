

export default class StorageService {

    static save(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    static receive(name) {
        return JSON.parse(localStorage.getItem(name));
    }

    static remove(name) {
        localStorage.removeItem(name);
    }
}