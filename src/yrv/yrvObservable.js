

class Observable {
    constructor() {
        this.updateFunctions = new Set()
    }
    add(observableUpdate) {
        if (!this.updateFunctions.has(observableUpdate)) {
            this.updateFunctions.add(observableUpdate)
        }

    }
    has(observableUpdate) {
        this.updateFunctions.has(observableUpdate)
    }
    invoke() {
        this.updateFunctions.forEach(fun => fun())
    }
}
export default Observable