class YrvObservable {
    constructor(name) {
        this.name=name
        this.updateFunctions=[]
    }
    add(observableUpdate) {
        this.updateFunctions.push(observableUpdate)
    }
    has(observableUpdate) {
       return  observableUpdate in this.updateFunctions
    }
    invoke() {
        this.updateFunctions.forEach((fun) => { 
            fun()
        })
    }
}
export default YrvObservable