/**
 * the map object use to save likily (key,value) data
 */
class Map {
    constructor(name) {
        this.length = 0;
        this.name=name
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
    forEachKV(callback){
        Object.keys(this.map).forEach(mapKey=>{
            callback(mapKey,this.map[mapKey])
        })
    }
    /*
    * filter value by callback()
      if callback return true 
     */
    filterV(callback){
        var value=undefined;
        this.forEachKV((k,v)=>{
            if(callback(k,v)==true){
                value=v
            }else{
            
            }
        })
       
        return value
    }
    size() {
        return this.length;
    }
    clear() {
        this.length = 0;
        this.map = new Object();
    }
}
export default Map