/**
 * the map object use to save likily (key,value) data
 */
class Map {
    constructor() {
        this.length = 0;
        this.map = new Object();
    }
    put(key, value) {
        if (!(key in this.map)) {
            this.length++;
        }
        this.map[key] = value;
    }
    get(key) {
        return (key in this.map) ? this.map[key] : null;
    }
    remove(key) {
        if ((key in this.map)) {
            delete this.map[key]
            this.length--;
        }
    }

    hasKey(key) {
        return (key in this.map)
    }
    forEach(callback) {
        Object.keys(this.map).forEach(mapKey => {
            callback(this.map[mapKey])
        })
    }
    size() {
        return this.length;
    }
    clear() {
        length = 0;
        this.map = new Object();
    }
}
export default Map