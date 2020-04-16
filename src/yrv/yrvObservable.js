class YrvObservable {
    constructor() {
        // this.updateFunctions = new Set()
        this.updateFunctions=[]
    }
    add(observableUpdate) {
        //if (!this.updateFunctions.has(observableUpdate)) {
        // this.updateFunctions.add(observableUpdate)
        //}
        this.updateFunctions.push(observableUpdate)
    }
    has(observableUpdate) {
        // this.updateFunctions.has(observableUpdate)
    }
    invoke() {
        this.updateFunctions.forEach((fun) => { 
            fun()
        })
    }
}
export default YrvObservable